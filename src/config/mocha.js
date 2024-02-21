module.exports = {
  overrides: (presetConfig, allOptions) => {
    let config = {
      fileFilter: [
        "**/*.test.ts",
        "**/*.test.js",
        "tests/**/*.ts",
        "tests/**/*.js",
        "test/**/*.ts",
        "test/**/*.js",
        "**/tests/**/*.ts",
        "**/tests/**/*.js",
        "**/test/**/*.ts",
        "**/test/**/*.js",
      ],
      expectHelper: true,
      mocha: true,
    };
    if (typeof presetConfig === "object") {
      config = {
        ...config,
        ...presetConfig,
      };
    }
    const extendsBase = ["plugin:mocha/recommended"];
    if (config.chai) extendsBase.push("plugin:chai-friendly/recommended");
    const mochaOverride = {
      files: config.fileFilter,
      env: {mocha: true},
      extendsBase,
      rules: {
        "mocha/handle-done-callback": ["error", {"ignoreSkipped": true}],
        "mocha/no-mocha-arrows": "off",
        "prefer-arrow-callback": "off",
        "mocha/prefer-arrow-callback": ["warn", {"allowUnboundThis": false}],
        "func-names": "off",
      },
    };
    if (config.expectHelper) {
      mochaOverride.rules["no-unused-expressions"] = "off";
      if (allOptions.typescript) {
        mochaOverride.rules["@typescript-eslint/no-unused-expressions"] = "off";
        mochaOverride.rules["@typescript-eslint/no-non-null-assertion"] = "off";
      }
    }
    return [mochaOverride];
  },
};
