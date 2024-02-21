const cfgBase = require("./config/base.js");
const cfgJSX = require("./config/jsx.js");
const cfgImport = require("./config/import.js");
const cfgReactHooks = require("./config/reacthooks.js");
const cfgReactNative = require("./config/reactnative.js");
const cfgTypescript = require("./config/typescript.js");
const cfgDeprecation = require("./config/deprecation.js");
const cfgPromise = require("./config/promise.js");
const cfgMocha = require("./config/mocha.js");
const {dependencyReportKey} = require("./consts.js");

const defaultConfigBase = {
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};

/**
 * Get an override config section
 */
const getOverride = (
  config,
  overrideList,
) => {
  if (config.overrides === undefined) config.overrides = [];

  const overrideListJSON = JSON.stringify(overrideList);
  const existingEntry = config.overrides.find(
    entry => {
      const entryFilesAsJson = JSON.stringify(entry.files);
      return entryFilesAsJson === overrideListJSON;
    },
  );
  if (!existingEntry) {
    const result = {files: [...overrideList]};
    config.overrides.push(result);
    return result;
  }
  return existingEntry;
};

/**
 * Apply a preset configuration to a preset object
 */
const applyConfig = (source, config, allOptions, dependencies) => typeof source === "function"
  ? source(config, allOptions, dependencies)
  : source;

/** Add a plugin to the plugins list */
const addPlugins = (
  config,
  presetPlugins,
  presetConfig,
  allOptions,
  dependencies,
) => {
  const newPlugins = applyConfig(presetPlugins, presetConfig, allOptions, dependencies);
  if (!newPlugins) return;

  if (!config.plugins) {
    config.plugins = [...newPlugins];
    return;
  }
  newPlugins.forEach(newPlugin => {
    if (config.plugins.includes(newPlugin)) return;

    config.plugins.push(newPlugin);
  });
};

/**
 * Add an entry to the extends list
 */
const addExtends = (
  config,
  presetExtends,
  presetConfig,
  allOptions,
  dependencies,
) => {
  const newExtends = applyConfig(presetExtends, presetConfig, allOptions, dependencies);
  if (!newExtends) return;

  if (!config.extends) {
    config.extends = [...newExtends];
    return;
  }
  newExtends.forEach(finalExtend => {
    if (config.extends.includes(finalExtend)) return;

    config.extends.push(finalExtend);
  });
};

/**
 * Add an env to the envs list
 */
const addEnvs = (
  config,
  presetEnvs,
  presetConfig,
  dependencies,
) => {
  const newEnvs = applyConfig(presetEnvs, presetConfig, undefined, dependencies);
  if (!newEnvs) return;

  if (!config.env) {
    config.env = {...newEnvs};
    return;
  }
  config.env = {
    ...config.env,
    ...newEnvs,
  };
};

/** Add rules to a config */
const addRules = (
  config,
  presetRules,
  presetConfig,
  allOptions,
  dependencies,
) => {
  const newRules = applyConfig(presetRules, presetConfig, allOptions, dependencies);
  if (!newRules) return;

  if (!config.rules) {
    config.rules = {...newRules};
    return;
  }
  config.rules = {
    ...config.rules,
    ...newRules,
  };
};

/** Add parser options */
const addParserOptions = (
  config,
  presetParserOptions,
  presetConfig,
  dependencies,
) => {
  const newParserOptions = applyConfig(presetParserOptions, presetConfig, undefined, dependencies);
  if (!newParserOptions) return;

  if (!config.parserOptions) {
    config.parserOptions = {...newParserOptions};
    return;
  }
  config.parserOptions = {
    ...config.parserOptions,
    ...newParserOptions,
  };
};

/**
 * Add settings entries
 */
const addSettings = (
  config,
  presetSettings,
  presetConfig,
  allOptions,
  dependencies,
) => {
  const newSettings = typeof presetSettings === "function"
    ? presetSettings(presetConfig, allOptions, dependencies)
    : presetSettings;
  if (!newSettings) return;

  if (!config.settings) config.settings = {};

  Object.keys(newSettings).forEach(sectionName => {
    config.settings[sectionName] = {
      ...(config.settings[sectionName] || {}),
      ...newSettings[sectionName],
    };
  });
};

/**
 * Change the parser
 */
const setParser = (
  config,
  presetParser,
  presetConfig,
  dependencies,
) => {
  const newParser = applyConfig(presetParser, presetConfig, undefined, dependencies);
  if (!newParser) return;

  config.parser = newParser;
};

/**
 * List of available presets
 */
const presets = {
  "base": cfgBase,
  "promise": cfgPromise,
  "jsx": cfgJSX,
  "import": cfgImport,
  "reacthooks": cfgReactHooks,
  "reactnative": cfgReactNative,
  "typescript": cfgTypescript,
  "deprecation": cfgDeprecation,
  "mocha": cfgMocha,
};

// Forced order is needed because some rules override previous rules
const presetsOrder = [
  "base",
  "promise",
  "jsx",
  "import",
  "reactnative",
  "reacthooks",
  "typescript",
  "deprecation",
  "mocha",
];

/**
 * Merge entries from a preset.
 *
 * `dependencies` is an optiona Set<string> where the preset can add its required dependencies.
 */
const mergePreset = (
  config,
  presetDef,
  presetConfig,
  allOptions,
  dependencies,
) => {
  if (dependencies && presetDef.dependencies) {
    for (const dependency of presetDef.dependencies) dependencies.add(dependency);
  }
  setParser(config, presetDef.parser, presetConfig, dependencies);
  addParserOptions(config, presetDef.parserOptions, presetConfig, dependencies);
  addSettings(config, presetDef.settings, presetConfig, allOptions, dependencies);
  addEnvs(config, presetDef.env, presetConfig, dependencies);
  addPlugins(config, presetDef.plugins, presetConfig, allOptions, dependencies);
  addExtends(config, presetDef.extendsBase, presetConfig, allOptions, dependencies);
  addRules(config, presetDef.rules, presetConfig, allOptions, dependencies);
  if (presetDef.overrides) {
    const actualOverrides = (typeof presetDef.overrides === "function")
      ? presetDef.overrides(presetConfig, allOptions, dependencies)
      : presetDef.overrides;
    actualOverrides.forEach(presetOverride => {
      const overrideConfig = getOverride(config, presetOverride.files);
      mergePreset(overrideConfig, presetOverride, presetConfig, allOptions, dependencies);
    });
  }
};

/**
 * Merge all presets
 */
const mergeAllPresets = (
  config,
  options,
  dependencies,
) => {
  presetsOrder.forEach(presetName => {
    const presetConfig = options[presetName];
    if (!presetConfig) return;

    mergePreset(
      config,
      presets[presetName],
      presetConfig,
      options,
      dependencies,
    );
  });
};

// eslint-disable-next-line no-process-env
const addDependencies = () => process.env[dependencyReportKey] === "1";

module.exports = (
  eslintConfig,
  baseConfig,
) => {
  const result = {
    ...defaultConfigBase,
    ...(baseConfig || {}),
  };
  const config = eslintConfig || {};
  if (config.base === undefined) config.base = true;
  if (config.promise === undefined) config.promise = true;
  if (config.import === undefined) config.import = true;
  if (config.deprecation === undefined) config.deprecation = true;
  const dependencies = addDependencies() ? new Set() : undefined;
  mergeAllPresets(result, config, dependencies);
  if (dependencies) return dependencies;
  return result;
};
