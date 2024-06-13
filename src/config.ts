// #region Types
interface ImportConfig {
  /** Defaults to true */
  detectImportCycle?: boolean;
}

interface MochaConfig {
  fileFilter?: Array<string>;
  expectHelper?: boolean;
}

/** Config object passed to main function */
export interface KeeexEslintConfig {
  /** Defaults to true */
  base?: boolean;
  /** Defaults to true, needs TypeScript */
  deprecation?: boolean;
  /** Defaults to true */
  import?: ImportConfig | boolean;
  /** Defaults to false; pass either true to autodetect or a React version */
  jsx?: boolean;
  /** Defaults to false */
  mocha?: MochaConfig | boolean;
  /** Defaults to true */
  promise?: boolean;
  /** Defaults to false */
  reacthooks?: boolean;
  /** Defaults to false */
  reactnative?: boolean;
  /** Defaults to true */
  tsdoc?: boolean;
  /** Defaults to false */
  typescript?: boolean;
}

export interface ConfigWithDefault {
  base: boolean;
  deprecation: boolean;
  import: Required<ImportConfig> | false;
  jsx: boolean;
  mocha: Required<MochaConfig> | false;
  promise: boolean;
  reacthooks: boolean;
  reactnative: boolean;
  tsdoc: boolean;
  typescript: boolean;
}
// #endregion

// #region Consts
const mochaDefault: Required<MochaConfig> = {
  fileFilter: [
    "**/*.test.ts",
    "**/*.test.js",
    "**/testutils.ts",
    "**/testutils.js",
    "tests/**/*.ts",
    "tests/**/*.js",
    "test/**/*.ts",
    "test/**/*.js",
  ],
  expectHelper: false,
};

// #region Helpers
const getImportConfig = (
  importConfig: ImportConfig | boolean | undefined,
): (Required<ImportConfig> | false) => {
  if (!importConfig) return false;
  if (importConfig === true) return {detectImportCycle: true};
  if (importConfig.detectImportCycle === undefined) return {detectImportCycle: true};
  return {detectImportCycle: importConfig.detectImportCycle};
};

const getJsxConfig = (jsxConfig: boolean | undefined): boolean => {
  if (!jsxConfig) return false;
  return true;
};

const getMochaConfig = (
  mocha: MochaConfig | boolean | undefined,
): (Required<MochaConfig> | false) => {
  if (!mocha) return false;
  if (mocha === true) return {...mochaDefault};
  return {
    fileFilter: mocha.fileFilter ?? mochaDefault.fileFilter,
    expectHelper: mocha.expectHelper ?? mochaDefault.expectHelper,
  };
};
// #endregion

// #region Service
/** Setup all default values */
const getConfig = (userConfig: KeeexEslintConfig): ConfigWithDefault => ({
  base: !!userConfig.base,
  deprecation: !!userConfig.deprecation,
  import: getImportConfig(userConfig.import),
  jsx: getJsxConfig(userConfig.jsx),
  mocha: getMochaConfig(userConfig.mocha),
  promise: !!userConfig.promise,
  reacthooks: !!userConfig.reacthooks,
  reactnative: !!userConfig.reactnative,
  tsdoc: !!userConfig.tsdoc,
  typescript: !!userConfig.typescript,
});

export default getConfig;
// #endregion
