import * as defaults from "./defaults.js";
import * as lazy from "./config/lazy.js";

import {clearConfig} from "./sections.js";

/** Setup all defaults in the eslintParams config */
const configDefaults = eslintParams => ({
    globals: eslintParams?.globals ?? defaults.globals,
    ignores: eslintParams?.ignores ?? defaults.ignores,
    noBase: eslintParams?.noBase ?? false,
  });

/**
 * Build the eslint configuration from the provided settings.
 * 
 * @param [eslintParams.noBase] {boolean} - Disable the base settings
 * @param [eslintParams.ignores] {string[]} - List of files to ignore.
 * Defaults to `["lib", "web", "gen", "src/gen"]`.
 * @param [eslintParams.globals.[].files] {string[]} - List of globs to include.
 * @param [eslintParams.globals.[].globals.builtin] {boolean} - Enable builtin JS globals
 * @param [eslintParams.globals.[].globals.browser] {boolean} - Enable browser globals
 * @param [eslintParams.globals.[].globals.commonjs] {boolean} - Enable browser globals
 * @param [eslintParams.globals.[].globals.es2025] {boolean} - Enable ES2025 globals
 * @param [eslintParams.globals.[].globals.mocha] {boolean} - Enable mocha globals
 * @param [eslintParams.globals.[].globals.node] {boolean} - Enable node globals
 * @param [eslintParams.globals.[].globals.serviceworker] {boolean} - Enable serviceworker globals
 * @param [eslintParams.globals.[].globals.worker] {boolean} - Enable worker globals
 * @param [eslintParams.globals.[].globals.custom] {Record<string, boolean>} - Enable custom globals
 * 
 * @returns
 * The eslint config object
 */
const eslintConfig = async eslintParams => {
  const fullConfig = configDefaults(eslintParams);
  const res = [];
  if (!fullConfig.noBase) (await lazy.base()).apply(res, fullConfig);
  if (fullConfig.globals) (await lazy.globals()).apply(res, fullConfig);
  clearConfig(res);
  return res;
};

export default eslintConfig;
