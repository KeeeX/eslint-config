const cfgBase = require("./config/base");
const cfgJSX = require("./config/jsx");
const cfgReactNative = require("./config/reactnative");
const cfgTypescript = require("./config/typescript");
const cfgPromise = require("./config/promise");

const defaultConfigBase = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  overrides: [
    {
      files: [
        "webres/**/*.js",
        "webres/**/*.ts",
      ],
      env: {browser: true},
    },
  ],
};

/**
 * Get an override config section
 */
const getOverride = (
  config,
  overrideList,
) => {
  if (config.overrides === undefined) {
    config.overrides = [];
  }
  const overrideListJSON = JSON.stringify(overrideList);
  const existingEntry = config.overrides.find(
    (entry) => {
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
const applyConfig = (source, config) => typeof source === "function"
  ? source(config)
  : source;

/** Add a plugin to the plugins list */
const addPlugins = (
  config,
  presetPlugins,
  presetConfig,
) => {
  const newPlugins = applyConfig(presetPlugins, presetConfig);
  if (!newPlugins) {
    return;
  }
  if (!config.plugins) {
    config.plugins = [...presetPlugins];
    return;
  }
  presetPlugins.forEach((newPlugin) => {
    if (config.plugins.includes(newPlugin)) {
      return;
    }
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
) => {
  const newExtends = applyConfig(presetExtends, presetConfig);
  if (!newExtends) {
    return;
  }
  if (!config.extends) {
    config.extends = [...newExtends];
    return;
  }
  presetExtends.forEach((finalExtend) => {
    if (config.extends.includes(finalExtend)) {
      return;
    }
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
  if (!newEnvs) {
    return;
  }
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
) => {
  const newRules = applyConfig(presetRules, presetConfig);
  if (!newRules) {
    return;
  }
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
  if (!newParserOptions) {
    return;
  }
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
) => {
  const newSettings = typeof presetSettings === "function"
    ? presetSettings(presetConfig)
    : presetSettings;
  if (!newSettings) {
    return;
  }
  if (!config.settings) {
    config.settings = {};
  }
  Object.keys(newSettings).forEach((sectionName) => {
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
  if (!newParser) {
    return;
  }
  config.parser = newParser;
};

/**
 * List of available presets
 */
const presets = {
  "base": cfgBase,
  "promise": cfgPromise,
  "jsx": cfgJSX,
  "reactnative": cfgReactNative,
  "typescript": cfgTypescript,
};

/**
 * Merge entries from a preset
 */
const mergePreset = (
  config,
  presetDef,
  presetConfig,
) => {
  setParser(config, presetDef.parser, presetConfig);
  addParserOptions(config, presetDef.parserOptions, presetConfig);
  addSettings(config, presetDef.settings, presetConfig);
  addEnvs(config, presetDef.env, presetConfig);
  addPlugins(config, presetDef.plugins, presetConfig);
  addExtends(config, presetDef.extendsBase, presetConfig);
  addRules(config, presetDef.rules, presetConfig);
  if (presetDef.overrides) {
    presetDef.overrides.forEach((presetOverride) => {
      const overrideConfig = getOverride(config, presetOverride.files);
      mergePreset(overrideConfig, presetOverride, presetConfig);
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
  Object.keys(presets).forEach((presetName) => {
    const presetConfig = options[presetName];
    if (!presetConfig) {
      return;
    }
    mergePreset(
      config,
      presets[presetName],
      presetConfig,
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
  if (config.base === undefined) {
    config.base = true;
  }
  if (config.promise === undefined) {
    config.promise = true;
  }
  mergeAllPresets(result, config);
  return result;
};
