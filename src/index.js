import * as lazy from "./config/lazy.js";
import {getReactFullConfig} from "./config/reactfullconfig.js";
import * as defaults from "./defaults.js";

import {configToDependencies} from "./dependencies.js";
import * as environ from "./environ.js";
import {clearConfig} from "./sections.js";

/** Setup all defaults in the eslintParams config */
const configDefaults = (eslintParams) => ({
  globals: eslintParams?.globals ?? defaults.globals,
  ignores: eslintParams?.ignores ?? defaults.ignores,
  import: eslintParams?.import ?? defaults.cycleMaxDepth,
  mocha: eslintParams?.mocha ?? true,
  noBase: eslintParams?.noBase ?? false,
  react: eslintParams?.react ?? false,
  typescript: eslintParams?.typescript ?? true,
});

/**
 * Build the eslint configuration from the provided settings.
 *
 * @param [eslintParams.noBase] {boolean} - Disable the base settings
 *
 * @param [eslintParams.ignores] {string[]} - List of files to ignore.
 * Defaults to `["lib", "web", "gen", "src/gen"]`.
 *
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
 * @param [eslintParams.typescript] {boolean} - Enable typescript support (defaults to true)
 *
 * @param [eslintParams.import] {boolean|number} - Enable import linting support (defaults to true)
 * If a number is provided, it's the maximum cycle detection depth.
 *
 * @param [eslintParams.react] {object|false} - If trueish, enable React support.
 * @param [eslintParams.react.reactHooks] {boolean} - Enable react-hooks stuff.
 *
 * @param [eslintParams.mocha] {boolean} - Enable mocha plugins
 *
 * @returns
 * The eslint config object
 */
const eslintConfig = async (eslintParams) => {
  const fullConfig = configDefaults(eslintParams);
  const res = [];
  if (environ.isDepCheck()) {
    configToDependencies(fullConfig);
  } else {
    if (!fullConfig.noBase) (await lazy.base()).apply(res, fullConfig);
    if (fullConfig.globals) (await lazy.globals()).apply(res, fullConfig);
    if (fullConfig.typescript) (await lazy.typescript()).apply(res, fullConfig);
    if (fullConfig.import !== false) (await lazy.importx()).apply(res, fullConfig);
    const reactCfg = getReactFullConfig(fullConfig.react);
    if (reactCfg.react) (await lazy.react()).apply(res, fullConfig);
    if (reactCfg.reactHooks) (await lazy.reactHooks()).apply(res, fullConfig);
    if (fullConfig.mocha) (await lazy.mocha()).apply(res, fullConfig);
    clearConfig(res);
  }
  return res;
};

export default eslintConfig;
