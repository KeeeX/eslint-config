#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";

const eslintFile = path.resolve(process.cwd(), "eslint.config.js");
if (!fs.existsSync(eslintFile)) {
  throw new Error(
    "This command must be run in the root of the project and contain an eslint.config.js file.",
  );
}

const eslintConfig = await import(eslintFile);
console.log(JSON.stringify(eslintConfig, null, 2));
