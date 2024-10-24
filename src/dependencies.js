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
  "eslint-plugin-import",
];

let pkgJson;

export const needDependencies = (name) => name in requiredDependencies;

/**
 * Retrieve the current project's "package.json".
 *
 * This assumes that the command is run at the root of the project.
 */
export const getPkgJson = () => {
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
 * @returns {{installed: "prod" | "dev" | false; version: string}}
 */
const dependencyStatus = (name) => {
  const pkg = getPkgJson();
  let installed = "missing";
  if (pkg.devDependencies && name in pkg.devDependencies) installed = "dev";
  if (pkg.dependencies && name in pkg.dependencies) installed = "prod";
  const version = installed === "missing" ? undefined : getInstalledVersion(name);
  return {installed, version};
};

/**
 * Add an NPM dependency to the list
 *
 * @param depName {string} - Name of the dependency
 * @param version {string} - A specific version string (or tag) to install if the dependency is
 * missing
 */
export const addDependency = (depName, version) => {
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
  const res = cp.spawnSync(cmd, args, {encoding: "utf8"});
  if (res.status !== 0) {
    console.log(`Command ${cmd} failed with exit code ${res.status}`);
    console.log("stdout:");
    console.log(res.stdout);
    console.log("stderr:");
    console.log(res.stderr);
    return false;
  }
  return true;
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
      const expectedVersion = requiredDependencies[required].version;
      const status = dependencyStatus(required);
      const needUpdate = status.installed !== "dev" || !satisfies(status.version, expectedVersion);
      console.log(
        `dep:${required} (${status.installed}=${status.version}) (required=${expectedVersion})`,
      );
      if (needUpdate) res.push({name: required, action: "install"});
    }
    return res.toSorted((a, b) => a.name.localeCompare(b.name));
  } finally {
    console.groupEnd();
  }
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
    if (!runProcess("npm", "install", "--save-dev", "--force", ...installNames)) {
      process.exitCode = 1;
      return false;
    }
  }
  return true;
};

/** Add all dependencies needed by the provided config */
export const configToDependencies = (eslintConfig) => {
  addDependency("eslint", "9.x");
  addDependency("prettier", "3.x");
  if (eslintConfig.globals) addDependency("globals", "15.x");
  if (eslintConfig.import !== false) {
    addDependency("eslint-plugin-import-x", "4.x");
    if (eslintConfig.typescript) addDependency("eslint-import-resolver-typescript", "3.x");
  }
  if (eslintConfig.mocha) addDependency("eslint-plugin-mocha", "10.x");
  if (!eslintConfig.noBase) {
    addDependency("@eslint/js", "9.x");
    addDependency("eslint-plugin-promise", "7.x");
  }
  const react = getReactFullConfig(eslintConfig.react);
  if (react.react) {
    addDependency("eslint-plugin-react", "7.x");
    if (eslintConfig.import) addDependency("eslint-import-resolver-webpack", "0.x");
    if (react.reactHooks) addDependency("eslint-plugin-react-hooks", "5.x");
    if (react.reactNative) {
      addDependency("eslint-plugin-react-native", "4.x");
      addDependency("@eslint/js", "9.x");
    }
  }
  if (eslintConfig.typescript) {
    addDependency("typescript-eslint", "8.x");
    addDependency("eslint-plugin-tsdoc", "0.x");
  }
};
