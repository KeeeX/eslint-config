#!/usr/bin/env node
/* eslint-disable no-console */
import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";

import prompts from "prompts";

import * as deps from "../dependencies.js";
import {setDepCheck} from "../environ.js";

let cliInit;

const getCliInit = () => {
  if (cliInit) return cliInit;
  for (const arg of process.argv) {
    try {
      const parsed = JSON.parse(arg);
      if (parsed.type === "cliInit") {
        cliInit = parsed;
        return cliInit;
      }
    } catch {}
  }
  cliInit = {};
  return cliInit;
};

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
      const toRemove = dependencies.filter((c) => c.action === "remove");
      const toInstall = dependencies.filter((c) => c.action === "install");
      if (toRemove.length > 0) {
        console.group("- Dependencies to remove:");
        toRemove.forEach((c) => console.log(`- ${c.name}`));
        console.groupEnd();
      }
      if (toInstall.length > 0) {
        console.group("Dependencies to install:");
        toInstall.forEach((c) => console.log(`- ${c.name}`));
        console.groupEnd();
      }
      if (process.argv.includes("auto")) {
        console.log("Auto mode enabled, installing dependencies");
        deps.installAndRemoveDeps();
      } else if (dependencies.length > 0) {
        console.log('To enable auto mode, run this command with the "auto" flag');
      }
    }
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

const getOptionsFromTargetFilter = (target) => {
  switch (target) {
    case "js":
      return {
        haveMocha: "maybe",
        haveReact: false,
      };
    case "node":
      return {
        haveMocha: "maybe",
        haveReact: "maybe",
      };
    case "browser":
      return {
        haveMocha: "maybe",
        haveReact: "maybe",
      };
    case "react-native":
      return {
        haveMocha: false,
        haveReact: true,
      };
  }
  throw new Error("Unexpected state");
};

const getBooleanPrompt = async (message) => {
  const replyValue = await prompts({
    initial: true,
    message,
    name: "value",
    type: "toggle",
  });
  return replyValue.value;
};

const getOptionsFromTarget = async (target) => {
  let {haveMocha, haveReact} = await getOptionsFromTargetFilter(target);
  if (haveReact === "maybe") haveReact = await getBooleanPrompt("Use React?");
  if (haveMocha === "maybe") {
    const cliHaveTest = getCliInit().haveTests;
    if (cliHaveTest === undefined) {
      haveMocha = await getBooleanPrompt("Use Mocha?");
    } else {
      haveMocha = cliHaveTest;
    }
  }
  return {haveReact, haveMocha};
};

const getAvailableEnv = (target, haveMocha, haveReact) => {
  switch (target) {
    case "js":
      if (haveMocha) return ["library"];
      return [];
    case "node":
      if (haveReact) return ["webservice", "node", "none"];
      return ["node"];
    case "browser":
      return ["webapp", "weblibrary"];
    case "react-native":
      return ["mobile"];
  }
  throw new Error("Unexpected state");
};

const getEnvTitle = (envName) => {
  switch (envName) {
    case "webservice":
      return "Webservice (server + webapp)";
    case "webapp":
      return "Webapp only";
    case "weblibrary":
      return "Library for browsers only";
    case "mobile":
      return "React-native mobile app";
    case "library":
      return "Pure JavaScript library";
    case "node":
      return "NodeJS application";
    case "none":
      return "Do not pick an environment";
  }
  throw new Error("Unexpected state");
};

const getEnvFromTarget = async (target, haveMocha, haveReact) => {
  const availableEnv = getAvailableEnv(target, haveMocha, haveReact);
  if (availableEnv.length === 0) return null;
  if (availableEnv.length === 1) return availableEnv[0];
  const choice = await prompts({
    choices: availableEnv.map((e) => ({title: getEnvTitle(e), value: e})),
    message: "Target environment?",
    name: "value",
    type: "select",
  });
  if (!choice.value) return null;
  return choice.value;
};

const genConfig = (targetEnv, mocha, react) => {
  const configRows = [];
  if (targetEnv && targetEnv !== "none") {
    configRows.push(`"environments": ${JSON.stringify(targetEnv)}`);
  }
  configRows.push(`"mocha": ${JSON.stringify(mocha)}`);
  configRows.push(`"react": ${JSON.stringify(react)}`);
  configRows.push('"typescript": true');
  return `
import eslintConfig from "@keeex/eslint-config";

export default await eslintConfig({
${configRows.map((c) => `  ${c},`).join("\n")}
});
`.trim();
};

/** Generate a new base config based on a few questions. */
const getNewConfig = async () => {
  const choices = [
    {title: "Generic JavaScript", value: "js"},
    {title: "NodeJS", value: "node"},
  ];
  const cliWeb = getCliInit().haveWeb;
  if (cliWeb === undefined || cliWeb === true) {
    choices.push(
      {title: "Browser", value: "browser"},
      {title: "React Native", value: "react-native"},
    );
  }
  const generalTarget = await prompts({
    choices,
    message: "General target environment",
    name: "value",
    type: "select",
  });
  const target = generalTarget.value;
  if (!target) return null;
  const {haveMocha, haveReact} = await getOptionsFromTarget(target);
  const targetEnv = await getEnvFromTarget(target, haveMocha, haveReact);
  return genConfig(targetEnv, haveMocha, haveReact);
};

const enforceNewline = (str) => (str.endsWith("\n") ? str : `${str}\n`);

/** Return true if the flat config system is ok */
const checkEslintConfig = async () => {
  console.group("Checking eslint config file…");
  try {
    const eslintrcPath = getEslintrcPath();
    const eslintConfigPath = getEslintConfig();
    if (eslintrcPath) {
      if (fs.existsSync(eslintConfigPath)) {
        console.log(
          `- Found ${eslintrcPath} but ${eslintConfigPath} already exists; remove ${eslintrcPath} when the configuration migration is complete.`,
        );
      } else {
        console.log(
          `- Found ${eslintrcPath} but no ${eslintConfigPath}; generating empty config. Please migrate from the old config then delete the old file.`,
        );
        fs.writeFileSync(eslintConfigPath, `${defaultConfig}\n`);
      }
      return false;
    }
    if (!fs.existsSync(eslintConfigPath)) {
      console.log(`- No ${eslintConfigPath} found. Generating new config.`);
      const configContent = await getNewConfig();
      if (configContent === null) {
        console.log("  Default config file generated. You'll have to edit it manually.");
        fs.writeFileSync(eslintConfigPath, enforceNewline(defaultConfig));
        return false;
      }
      fs.writeFileSync(eslintConfigPath, enforceNewline(configContent));
      return true;
    }
    const configContent = fs.readFileSync(eslintConfigPath, "utf8");
    if (configContent.indexOf(deleteLine) !== -1) {
      console.log(
        `- Found ${eslintConfigPath} with the delete line; configure eslint and remove that line.`,
      );
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

const PRETTIER_CONFIG = "prettier.config.js";

const prettierSetup = () => {
  console.group("Checking prettier config");
  try {
    if (fs.existsSync(PRETTIER_CONFIG)) {
      console.log("Configuration file already exist");
      return;
    }
    console.log("Writting prettier configuration file");
    fs.writeFileSync(
      PRETTIER_CONFIG,
      `
import config from "@keeex/eslint-config/prettier.config.js";

export default config;
`.trimStart(),
    );
  } finally {
    console.groupEnd();
  }
};

const checkTsConfig = () => {
  const needTsConfig = deps.needDependencies("typescript-eslint");
  if (!needTsConfig) return;
  console.group("Checking tsconfig");
  try {
    if (!fs.existsSync("tsconfig.json")) {
      console.log("tsconfig.json missing, this will *considerably* slow down eslint");
    }
  } finally {
    console.groupEnd();
  }
};

const checkProjectType = () => {
  const packageContent = JSON.parse(fs.readFileSync("package.json", "utf8"));
  if (packageContent.type !== "module") {
    console.error("package.json type is not module.");
    return false;
  }
  return true;
};

const main = async () => {
  console.group("KeeeX eslint and prettier configuration setup");
  try {
    const typeOk = checkProjectType();
    if (!typeOk) return;
    const configOk = await checkEslintConfig();
    if (!configOk) return;
    await prettierSetup();
    await depsCheck();
    checkTsConfig();
  } finally {
    console.groupEnd();
  }
};
await main();
