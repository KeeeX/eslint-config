import globals from "globals";

import * as pathutils from "../pathutils.js";
import * as sections from "../sections.js";

const base = {builtin: true, es2025: true};
/** Create the actual eslint globals object from user input */
const getGlobalsFromConfig = (configGlobals) => {
  const res = {};
  if (configGlobals?.builtin) Object.assign(res, globals.builtin);
  if (configGlobals?.browser) Object.assign(res, globals.browser);
  if (configGlobals?.commonjs) Object.assign(res, globals.commonjs);
  if (configGlobals?.es2025) Object.assign(res, globals.es2025);
  if (configGlobals?.mocha) Object.assign(res, globals.mocha);
  if (configGlobals?.node) Object.assign(res, globals.nodeBuiltin);
  if (configGlobals?.nodeCjs) Object.assign(res, globals.node);
  if (configGlobals?.serviceworker) Object.assign(res, globals.serviceworker);
  if (configGlobals?.worker) Object.assign(res, globals.worker);
  if (configGlobals?.custom) Object.assign(res, configGlobals.custom);
  return res;
};
const addEnv = ({configResult, eslintConfig}, name, fileTypes, globalsEsm, globalsCjs) => {
  const envDirs = pathutils.getEnvDirectories(name, eslintConfig.environments);
  if (envDirs.length === 0) return;
  const esmSection = sections.getNamedSection(configResult, `keeex/${name}-env-esm`);
  esmSection.files = pathutils.getFiles({
    exactDirectories: envDirs,
    fileTypes: {
      javascript: true,
      typescript: eslintConfig.typescript,
      ...fileTypes,
      cjs: false,
      esm: true,
    },
  });
  const cjsSection = sections.getNamedSection(configResult, `keeex/${name}-env-cjs`);
  cjsSection.files = pathutils.getFiles({
    exactDirectories: envDirs,
    fileTypes: {
      javascript: true,
      typescript: eslintConfig.typescript,
      ...fileTypes,
      cjs: true,
      esm: false,
    },
  });
  sections.sectionAddOption(
    esmSection,
    "languageOptions",
    "globals",
    getGlobalsFromConfig(globalsEsm),
  );
  sections.sectionAddOption(
    cjsSection,
    "languageOptions",
    "globals",
    getGlobalsFromConfig({...(globalsCjs ?? globalsEsm), commonjs: true}),
  );
};
const addNodeEnv = (configResult, eslintConfig) => {
  addEnv(
    {configResult, eslintConfig},
    "node",
    {},
    {node: true, worker: true},
    {nodeCjs: true, worker: true},
  );
};
const addWebappEnv = (configResult, eslintConfig) => {
  addEnv({configResult, eslintConfig}, "webapp", {jsx: true}, {browser: true, serviceworker: true});
};
const addMobileEnv = (configResult, eslintConfig) => {
  addEnv({configResult, eslintConfig}, "mobile", {jsx: true}, {browser: true});
};
const addMochaEnv = (configResult, eslintConfig) => {
  addEnv({configResult, eslintConfig}, "mocha", {}, {mocha: true});
};
export const apply = (configResult, eslintConfig) => {
  const sharedGlobals = eslintConfig.globals.find((c) => c.files === undefined) ?? {globals: {}};
  const sharedSection = sections.getNamedSection(configResult, "keeex/shared");
  sections.sectionAddOption(
    sharedSection,
    "languageOptions",
    "globals",
    getGlobalsFromConfig({...base, ...sharedGlobals.globals}),
  );
  for (const globalConfig of eslintConfig.globals) {
    if (!globalConfig.files) continue;
    const overrideSection = sections.getNamedSection(
      configResult,
      `keeex/globals-${globalConfig.files.join(",")}`,
    );
    overrideSection.files = [...globalConfig.files];
    sections.sectionAddOption(
      overrideSection,
      "languageOptions",
      "globals",
      getGlobalsFromConfig(globalConfig.globals),
    );
  }
  addNodeEnv(configResult, eslintConfig);
  addWebappEnv(configResult, eslintConfig);
  addMobileEnv(configResult, eslintConfig);
  addMochaEnv(configResult, eslintConfig);
};
