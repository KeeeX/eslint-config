#!/usr/bin/env node
/* eslint-disable no-console */
import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";

import * as deps from "../dependencies.js";
import {setDepCheck} from "../environ.js";

const getEslintConfig = () => path.resolve(process.cwd(), "eslint.config.js");

const depsCheck = async () => {
  console.group("eslint dependencies checking…");
  try {
    setDepCheck();
    console.log("- loading eslint.config.js");
    const eslintFile = getEslintConfig();
    await import(eslintFile);
    console.log("- listing dependencies");
    const dependencies = deps.listDependencies();
    if (dependencies.length === 0) {
      console.log("- All eslint dependencies installed");
    } else {
      const toRemove = dependencies.filter(c => c.action === "remove");
      const toInstall = dependencies.filter(c => c.action === "install");
      if (toRemove.length > 0) {
        console.group("- Dependencies to remove:");
        toRemove.forEach(c => console.log(`- ${c.name}`));
        console.groupEnd();
      }
      if (toInstall.length > 0) {
        console.group("Dependencies to install:");
        toInstall.forEach(c => console.log(`- ${c.name}`));
        console.groupEnd();
      }
      if (process.argv.includes("auto")) {
        console.log("Auto mode enabled, installing dependencies");
        deps.installAndRemoveDeps();
      } else if (dependencies.length > 0) {
        console.log("To enable auto mode, run this command with the \"auto\" flag");
      }
    };
  } finally {
    console.groupEnd();
  }
};

const eslintRcCandidates = [".js", ".cjs", ".json"];

const getEslintrcPath = () => {
  for (const candidate of eslintRcCandidates) {
    const eslintrcPath = path.join(process.cwd(), `.eslintrc${candidate}`);
    if (fs.existsSync(eslintrcPath)) return eslintrcPath;
  }
};

const deleteLine = "DELETE THIS LINE WHEN CONFIGURED";

const defaultConfig = `
// ${deleteLine}
import eslintConfig from "@keeex/eslint-config";

export default await eslintConfig({});
`.trim();

/** Return true if the flat config system is ok */
const checkEslintConfig = () => {
  console.group("Checking eslint config file…");
  try {
    const eslintrcPath = getEslintrcPath();
    const eslintConfigPath = getEslintConfig();
    if (eslintrcPath) {
      if (fs.existsSync(eslintConfigPath)) {
        console.log(`- Found ${eslintrcPath} but ${eslintConfigPath} already exists; remove ${eslintrcPath} when the configuration migration is complete.`);
      } else {
        console.log(`- Found ${eslintrcPath} but no ${eslintConfigPath}; generating empty config. Please migrate from the old config then delete the old file.`);
        fs.writeFileSync(eslintConfigPath, `${defaultConfig}\n`);
      }
      return false;
    }
    if (!fs.existsSync(eslintConfigPath)) {
      console.log(`- No ${eslintConfigPath} found. Generating empty config. Please configure it appropriately.`);
      fs.writeFileSync(eslintConfigPath, `${defaultConfig}\n`);
      return false;
    }
    const configContent = fs.readFileSync(eslintConfigPath, "utf8");
    if (configContent.indexOf(deleteLine) !== -1) {
      console.log(`- Found ${eslintConfigPath} with the delete line; configure eslint and remove that line.`);
      return false;
    }
    if (fs.existsSync(".eslintignore")) {
      console.log(`- Found .eslintignore; please remove it.`);
      return false;
    }
    return true;
  } finally {
    console.groupEnd();
  }
};

const main = async () => {
  console.group("KeeeX eslint configuration setup");
  try {
    const configOk = checkEslintConfig();
    if (configOk) await depsCheck();
  } finally {
    console.groupEnd();
  }
};

await main();
