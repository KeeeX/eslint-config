const cfgBase = require("./config/base");
const cfgJSX = require("./config/jsx");
const cfgReactNative = require("./config/reactnative");
const cfgTypescript = require("./config/typescript");
const cfgTypescriptTypes = require("./config/typescript_types");

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

/** Add a plugin to the plugins list */
const addPlugins = (
  config,
  newPlugins,
) => {
  if (!config.plugins) {
    config.plugins = [...newPlugins];
    return;
  }
  newPlugins.forEach((newPlugin) => {
    if (config.plugins.includes(newPlugin)) {
      return;
    }
    config.plugins.push(newPlugin);
  });
};

/** Add an entry to the extends list */
const addExtends = (
  config,
  newExtends,
) => {
  if (!config.extends) {
    config.extends = [...newExtends];
    return;
  }
  newExtends.forEach((newExtend) => {
    if (config.extends.includes(newExtend)) {
      return;
    }
    config.extends.push(newExtend);
  });
};

const addEnvs = (
  config,
  envs,
) => {
  if (!config.env) {
    config.env = {...envs};
    return;
  }
  config.env = {
    ...config.env,
    ...envs,
  };
};

/** Add rules to a config */
const addRules = (
  config,
  newRules,
) => {
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
  options,
) => {
  if (!config.parserOptions) {
    config.parserOptions = {...options};
    return;
  }
  config.parserOptions = {
    ...config.parserOptions,
    ...options,
  };
};

const addSettings = (
  config,
  section,
  settings,
) => {
  if (!config.settings) {
    config.settings = {[section]: {...settings}};
    return;
  }
  if (!config.settings[section]) {
    config.settings[section] = {...settings};
    return;
  }
  config.settings[section] = {
    ...config.settings[section],
    ...settings,
  };
};

/** Merge basic configuration into eslint config */
const mergeBase = (
  config,
  baseOptions,
) => {
  if (baseOptions === false) {
    return;
  }
  addExtends(config, cfgBase.extendsBase);
  addRules(config, cfgBase.rules);
};

const mergeJSX = (
  config,
  jsxOptions,
) => {
  if (!jsxOptions) {
    return;
  }
  const version = typeof jsxOptions === "string"
    ? jsxOptions
    : "detect";
  addSettings(
    config,
    "react",
    {version},
  );
  addExtends(config, cfgJSX.extendsBase);
  addRules(config, cfgJSX.rules);
};

const mergeReactNative = (
  config,
  reactNativeOptions,
) => {
  if (!reactNativeOptions) {
    return;
  }
  addPlugins(config, cfgReactNative.plugins);
  addEnvs(config, cfgReactNative.env);
  addRules(config, cfgJSX.rules);
};

const mergeTypescript = (
  config,
  typescriptOptions,
) => {
  if (!typescriptOptions) {
    return;
  }
  const projectFile = typeof typescriptOptions === "string"
    ? typescriptOptions
    : null;
  config.parser = cfgTypescript.parser;
  addExtends(config, cfgTypescript.extendsBase);
  addRules(config, cfgTypescript.rules);
  if (projectFile) {
    addParserOptions(config, {project: projectFile});
    addExtends(config, cfgTypescriptTypes.extendsBase);
    addRules(config, cfgTypescriptTypes.rules);
  }
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
  mergeBase(result, config.base);
  mergeJSX(result, config.jsx);
  mergeReactNative(result, config.reactnative);
  mergeTypescript(result, config.typescript);
  return result;
};
