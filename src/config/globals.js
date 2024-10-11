import globals from "globals";
import {addDependency} from "../dependencies.js";
import * as sections from "../sections.js";

/** Create the actual eslint globals object from user input */
const getGlobalsFromConfig = configGlobals => {
  const res = {};
  if (configGlobals?.builtin) Object.assign(res, globals.builtin);
  if (configGlobals?.browser) Object.assign(res, globals.browser);
  if (configGlobals?.commonjs) Object.assign(res, globals.commonjs);
  if (configGlobals?.es2025) Object.assign(res, globals.es2025);
  if (configGlobals?.mocha) Object.assign(res, globals.mocha);
  if (configGlobals?.node) Object.assign(res, globals.nodeBuiltin);
  if (configGlobals?.serviceworker) Object.assign(res, globals.serviceworker);
  if (configGlobals?.worker) Object.assign(res, globals.worker);
  if (configGlobals?.custom) Object.assign(res, configGlobals.custom);
  return res;
};

export const apply = (configResult, eslintConfig) => {
  addDependency("globals");
  const sharedGlobals = eslintConfig.globals.find(c => c.files === undefined);
  const sharedSection = sections.getNamedSection(configResult, "shared");
  sections.sectionAddOption(
    sharedSection,
    "languageOptions",
    "globals",
    getGlobalsFromConfig(sharedGlobals.globals),
  );
  for (const globalConfig of eslintConfig.globals) {
    if (!globalConfig.files) continue;
    const overrideSection = sections.getNamedSection(configResult, `override-${globalConfig.files.join(",")}`);
    overrideSection.files = [...globalConfig.files];
    sections.sectionAddOption(
      overrideSection,
      "languageOptions",
      "globals",
      getGlobalsFromConfig(globalConfig.globals),
    );
  }
};
