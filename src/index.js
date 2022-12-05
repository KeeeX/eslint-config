const cfgBase = require("./config/base.js");
const cfgJSX = require("./config/jsx.js");
const cfgImport = require("./config/import.js");
const cfgReactHooks = require("./config/reacthooks.js");
const cfgReactNative = require("./config/reactnative.js");
const cfgTypescript = require("./config/typescript.js");
const cfgDeprecation = require("./config/deprecation.js");
const cfgPromise = require("./config/promise.js");
const cfgMocha = require("./config/mocha.js");

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
const applyConfig = (source, config, allOptions) => typeof source === "function"
  ? source(config, allOptions)
  : source;

/** Add a plugin to the plugins list */
const addPlugins = (
  config,
  presetPlugins,
  presetConfig,
  allOptions,
) => {
  const newPlugins = applyConfig(presetPlugins, presetConfig, allOptions);
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
) => {
  const newExtends = applyConfig(presetExtends, presetConfig, allOptions);
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
) => {
  const newEnvs = applyConfig(presetEnvs, presetConfig);
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
) => {
  const newRules = applyConfig(presetRules, presetConfig, allOptions);
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
) => {
  const newParserOptions = applyConfig(presetParserOptions, presetConfig);
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
) => {
  const newSettings = typeof presetSettings === "function"
    ? presetSettings(presetConfig, allOptions)
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
) => {
  const newParser = applyConfig(presetParser, presetConfig);
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
 * Merge entries from a preset
 */
const mergePreset = (
  config,
  presetDef,
  presetConfig,
  allOptions,
) => {
  setParser(config, presetDef.parser, presetConfig);
  addParserOptions(config, presetDef.parserOptions, presetConfig);
  addSettings(config, presetDef.settings, presetConfig, allOptions);
  addEnvs(config, presetDef.env, presetConfig);
  addPlugins(config, presetDef.plugins, presetConfig, allOptions);
  addExtends(config, presetDef.extendsBase, presetConfig, allOptions);
  addRules(config, presetDef.rules, presetConfig, allOptions);
  if (presetDef.overrides) {
    const actualOverrides = (typeof presetDef.overrides === "function")
      ? presetDef.overrides(presetConfig, allOptions)
      : presetDef.overrides;
    actualOverrides.forEach(presetOverride => {
      const overrideConfig = getOverride(config, presetOverride.files);
      mergePreset(overrideConfig, presetOverride, presetConfig, allOptions);
    });
  }
};

/**
 * Merge all presets
 */
const mergeAllPresets = (
  config,
  options,
) => {
  presetsOrder.forEach(presetName => {
    const presetConfig = options[presetName];
    if (!presetConfig) return;

    mergePreset(
      config,
      presets[presetName],
      presetConfig,
      options,
    );
  });
};

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

  mergeAllPresets(result, config);
  return result;
};
