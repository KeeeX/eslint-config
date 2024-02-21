#!/usr/bin/env node
/* eslint-disable no-console */
const path = require("node:path");
const fs = require("node:fs");
const cp = require("node:child_process");
const {dependencyReportKey} = require("../consts.js");

/** List of previously used dependencies that could be removed */
const removedDependencies = [
  "eslint-plugin-imports",
  "eslint-import-resolver-typescript",
  "eslint-plugin-chai-friendly",
];

/**
 * Check if a dependency is installed (and is a dev dependency).
 *
 * @returns
 * "ok" if it is installed and a dev dependency, "prod" if installed and prod dependency, "missing"
 * if not installed.
 */
const haveDependency = (pkgJson, depName) => {
  if (pkgJson.devDependencies && depName in pkgJson.devDependencies) return "ok";
  if (pkgJson.dependencies && depName in pkgJson.dependencies) return "prod";
  return "missing";
};

/** Return the appropriate action for a required dependency */
const getAction = status => {
  switch (status) {
  case "ok": return "none";
  case "prod": return "install-as-dev";
  case "missing": return "install";
  default:
    throw new Error(`Unknown dependency status: ${status}`);
  }
};

const runOn = (pkgJson, eslintConfigPath) => {
  console.log("Reading current configuration");
  // eslint-disable-next-line no-process-env
  process.env[dependencyReportKey] = "1";
  // eslint-disable-next-line global-require, i/no-dynamic-require
  const requiredDependencies = require(eslintConfigPath);
  const report = {};
  console.log("Checking dependencies status");
  for (const dep of requiredDependencies) {
    const status = haveDependency(pkgJson, dep);
    const action = getAction(status);
    report[dep] = {status, action};
    console.log(`- ${dep}: ${status} (action: ${action})`);
  }
  for (const oldDep of removedDependencies) {
    const status = haveDependency(pkgJson, oldDep);
    if (status === "missing") continue;
    report[oldDep] = {status, action: "remove"};
    console.log(`- ${oldDep}: ${status} (action: remove)`);
  }
  const toInstall = [];
  const toRemove = [];
  for (const [dep, {action}] of Object.entries(report)) {
    if (action === "install") toInstall.push(dep);
    if (action === "install-as-dev") toInstall.push(dep);
    if (action === "remove") toRemove.push(dep);
  }
  if (toInstall.length === 0 && toRemove.length === 0) return;
  if (process.argv.indexOf("auto") === -1) {
    console.log("To automatically update dependencies, run this script with \"auto\"");
    return;
  }
  if (toInstall.length > 0) {
    console.log(`Installing dependencies: ${toInstall.join(", ")}`);
    cp.spawnSync("npm", ["install", "--save-dev", ...toInstall]);
  }
  if (toRemove.length > 0) {
    console.log(`Removing dependencies: ${toRemove.join(", ")}`);
    cp.spawnSync("npm", ["uninstall", ...toRemove]);
  }
};

const main = () => {
  const rootPath = path.resolve(".");
  const pkgJsonPath = path.resolve(rootPath, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    console.log("Please run this tool in the root of your project");
    process.exitCode = 1;
    return;
  }
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
  const eslintConfigPath = path.resolve(rootPath, ".eslintrc.cjs");
  const eslintConfigAltPath = path.resolve(rootPath, ".eslintrc.js");
  if (fs.existsSync(eslintConfigPath)) {
    runOn(pkgJson, eslintConfigPath);
  } else if (fs.existsSync(eslintConfigAltPath)) {
    runOn(pkgJson, eslintConfigAltPath);
  } else {
    console.log("No eslint config found");
    process.exitCode = 1;
  }
};

main();
