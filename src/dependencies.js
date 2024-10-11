import * as fs from "node:fs";
import * as cp from "node:child_process";

/** name => version | true */
const requiredDependencies = {};

/** List of dependencies no longer used and that should be removed */
const removedDependencies = [
  "eslint-import-resolver-typescript",
  "eslint-plugin-chai-friendly",
  "eslint-plugin-i",
  "eslint-plugin-import",
];

let pkgJson;

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

/**
 * Check if a particular dependency is installed in the project.
 *
 * @returns {"dev" | "prod" | "missing"}
 */
const dependencyStatus = name => {
  const pkg = getPkgJson();
  if (pkg.devDependencies && name in pkg.devDependencies) return "dev";
  if (pkg.dependencies && name in pkg.dependencies) return "prod";
  return "missing";
};

/**
 * Add an NPM dependency to the list
 *
 * @param depName {string} - Name of the dependency
 * @param [version] {string} - A specific version string (or tag) to install if the dependency is missing
 */
export const addDependency = (depName, version) => {
  requiredDependencies[depName] = version ?? true;
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
  const res = [];
  for (const removed of removedDependencies) {
    if (dependencyStatus(removed) !== "missing") res.push({name: removed, action: "remove"});
  }
  for (const required of requiredDependencies) {
    const status = dependencyStatus(required);
    if (status === "dev") res.push({name: required, action: "install"});
  }
  return res.toSorted((a, b) => a.name.localeCompare(b.name));
};

/**
 * Run the required installation/removal.
 *
 * @returns {boolean}
 * `false` if the process failed.
 */
export const installAndRemoveDeps = () => {
  const deps = listDependencies();
  const toInstall = deps.filter(c => c.action === "install").map(c => c.name);
  const toRemove = deps.filter(c => c.action === "remove").map(c => c.name);
  if (toRemove.length > 0) {
    console.log(`Removing dependencies: ${toRemove.join(", ")}`);
    if (!runProcess("npm", ["uninstall", ...toRemove])) {
      process.exitCode = 1;
      return false;
    }
  }
  if (toInstall.length > 0) {
    console.log(`Installing dependencies: ${toInstall.join(", ")}`);
    const installNames = toInstall.map(c => {
      const target = requiredDependencies[c];
      if (typeof target === "string") return `${c}@${target}`;
      return c;
    });
    if (!runProcess("npm", ["install", "--save-dev", ...installNames])) {
      process.exitCode = 1;
      return false;
    }
  }
  return true;
};
