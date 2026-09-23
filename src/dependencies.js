/* eslint-disable no-console */
import * as cp from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

import {satisfies} from "semver";

import {getReactFullConfig} from "./config/reactfullconfig.js";

/** name => {version: string, force: boolean} */
const requiredDependencies = {};

/** List of dependencies no longer used and that should be removed */
const removedDependencies = [
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "eslint-plugin-chai-friendly",
  "eslint-plugin-deprecation",
  "eslint-plugin-i",
  "eslint-plugin-react-native",
];

let pkgJson;

export const needDependencies = (name) => name in requiredDependencies;

/**
 * Retrieve the current project's "package.json".
 *
 * This assumes that the command is run at the root of the project.
 */
const getPkgJson = () => {
  if (!pkgJson) {
    try {
      const data = fs.readFileSync("./package.json", "utf8");
      pkgJson = JSON.parse(data);
    } catch (e) {
      throw new Error("Could not read ./package.json", {cause: e});
    }
  }
  return pkgJson;
};

/** Get installed package version */
const getInstalledVersion = (name) => {
  try {
    const depsPkg = JSON.parse(
      fs.readFileSync(path.join("node_modules", name, "package.json"), "utf8"),
    );
    return depsPkg.version;
  } catch {
    return "<unknown>";
  }
};

/**
 * Check if a particular dependency is installed in the project.
 *
 * @returns {{installed: "prod" | "dev" | false; version: string; keeex: boolean}}
 */
const dependencyStatus = (name) => {
  const pkg = getPkgJson();
  let installed = "missing";
  if (pkg.devDependencies && name in pkg.devDependencies) installed = "dev";
  if (pkg.dependencies && name in pkg.dependencies) installed = "prod";
  const version = installed === "missing" ? undefined : getInstalledVersion(name);
  const keeex = pkg.name.startsWith("@keeex/");
  return {installed, keeex, version};
};

/**
 * Add an NPM dependency to the list
 *
 * @param depName {string} - Name of the dependency
 * @param version {string} - A specific version string (or tag) to install if the dependency is
 * missing
 */
const addDependency = (depName, version) => {
  requiredDependencies[depName] = {version: version ?? true, force: false};
};

/**
 * Run a process, and display the output if an error occured.
 *
 * If the process fail, its output is displayed.
 *
 * @returns {boolean}
 * Returns false if the process ended with another status than 0.
 */
const runProcess = (cmd, ...args) => {
  const res = cp.spawnSync(cmd, args, {encoding: "utf8", stdio: "inherit"});
  if (res.status !== 0) {
    console.log(`Command ${cmd} failed with exit code ${res.status}`);
    return false;
  }
  return true;
};

/**
 * @param version {string} - Either the version as-is, or "KEEEX@<version>".
 *
 * @returns {{version: string; keeex: boolean}}
 */
const getExpectedVersion = (version) => {
  if (version.startsWith("KEEEX")) {
    const split = version.split("@");
    return {version: split[1], keeex: true};
  }
  return {version, keeex: false};
};

/**
 * Check if a dependency is properly installed
 * 
 * @param installedStatus - output of `dependencyStatus()`
 * @param expectedVersion - output of `getExpectedVersion()`
 *
 * @returns {boolean}
 * `true` if the package must be installed/updated
 */
const checkNeedUpdate = (installedStatus, expectedVersion) => {
  if (
    installedStatus.installed !== "dev"
    || (expectedVersion.keeex && !installedStatus.keeex)
    || !satisfies(installedStatus.version, expectedVersion)
  ) {
    return true;
  }
  return false;
};

/**
 * List all missing/extra dependencies.
 *
 * @returns {{name:string;action:"install"|"remove"}[]}
 * A list of dependencies with the action to do ("install" or "remove").
 */
export const listDependencies = () => {
  console.group();
  try {
    const res = [];
    for (const removed of removedDependencies) {
      if (dependencyStatus(removed).installed !== "missing") {
        res.push({name: removed, action: "remove"});
      }
    }
    for (const required of Object.keys(requiredDependencies)) {
      const expectedVersion = getExpectedVersion(requiredDependencies[required].version);
      const status = dependencyStatus(required);
      const needUpdate = checkNeedUpdate(status, expectedVersion);
      console.log(
        `dep:${required} (${status.installed}=${status.version}) (required=${JSON.stringify(expectedVersion)})`,
      );
      if (needUpdate) {
        if (expectedVersion.keeex) {
          if (status.installed !== "missing") {
            res.push({name: required, action: "remove"});
          }
          res.push({name: required, action: "keeex-install"});
        } else {
          res.push({name: required, action: "install"});
        }
      }
    }
    return res.toSorted((a, b) => a.name.localeCompare(b.name));
  } finally {
    console.groupEnd();
  }
};

let kxNpmPresent = null;

const isKxNpmPresent = () => {
  kxNpmPresent ??= runProcess("which", ["kxnpm"]);
  return kxNpmPresent;
};

const runNpmInstall = (pkgNames) => {
  if (isKxNpmPresent()) {
    return runProcess("kxnpm", "-a", "install", "--save-dev", "--force", "--", ...pkgNames);
  }
  console.warn("kxnpm not found, you might have issues when installing packages automatically");
  return runProcess("npm", "install", "--save-dev", "--force", ...pkgNames);
};

/**
 * Run the required installation/removal.
 *
 * @returns {boolean}
 * `false` if the process failed.
 */
export const installAndRemoveDeps = () => {
  const deps = listDependencies();
  const toInstall = deps.filter((c) => c.action === "install").map((c) => c.name);
  const toInstallKeeex = deps.filter((c) => c.action === "keeex-install").map((c) => c.name);
  const toRemove = deps.filter((c) => c.action === "remove").map((c) => c.name);
  if (toRemove.length > 0) {
    console.log(`Removing dependencies: ${toRemove.join(", ")}`);
    if (!runProcess("npm", "uninstall", "--force", ...toRemove)) {
      process.exitCode = 1;
      return false;
    }
  }
  if (toInstall.length > 0) {
    console.log(`Installing dependencies: ${toInstall.join(", ")}`);
    const installNames = toInstall.map((c) => {
      const target = requiredDependencies[c].version;
      if (typeof target === "string") return `${c}@${target}`;
      return c;
    });
    if (!runNpmInstall(installNames)) {
      process.exitCode = 1;
      return false;
    }
  }
  if (toInstallKeeex.length > 0) {
    console.log(`Installing @keeex dependencies: ${toInstallKeeex.join(", ")}`);
    const installNames = toInstallKeeex.map((c) => {
      const {version: target} = getExpectedVersion(requiredDependencies[c].version);
      if (typeof target === "string") return `${c}@npm:@keeex/${c}@${target}`;
      return c;
    });
    if (!runNpmInstall(installNames)) {
      process.exitCode = 1;
      return false;
    }
  }
  return true;
};

/** Add all dependencies needed by the provided config */
export const configToDependencies = (eslintConfig) => {
  addDependency("eslint", "10.x");
  addDependency("prettier", "3.x");
  if (eslintConfig.globals) addDependency("globals", "17.x");
  if (eslintConfig.import !== false) {
    addDependency("eslint-plugin-import-x", "4.x");
    if (eslintConfig.typescript) addDependency("eslint-import-resolver-typescript", "4.x");
  }
  if (eslintConfig.mocha) addDependency("eslint-plugin-mocha", "11.x");
  if (!eslintConfig.noBase) {
    addDependency("@eslint/js", "10.x");
    addDependency("eslint-plugin-promise", "7.x");
  }
  const react = getReactFullConfig(eslintConfig.react);
  if (react.react) {
    addDependency("eslint-plugin-react", "KEEEX@7.x");
    addDependency("eslint-plugin-import", "KEEEX@2.x");
    if (eslintConfig.import) addDependency("eslint-import-resolver-webpack", "0.x");
    if (react.reactHooks) addDependency("eslint-plugin-react-hooks", "5.x");
    if (react.reactNative) {
      addDependency("@eslint/js", "10.x");
    }
  }
  if (eslintConfig.typescript) {
    addDependency("typescript-eslint", "8.x");
    addDependency("eslint-plugin-tsdoc", "0.x");
  }
};
