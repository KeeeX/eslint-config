const base = {
  "i/no-unresolved": "error",
  "i/named": "error",
  "i/export": "error",
  "i/no-duplicates": "warn",
  "i/default": "off",
  "i/namespace": "off",
  "i/no-absolute-path": "error",
  "i/no-dynamic-require": "error",
  "i/no-webpack-loader-syntax": "error",
  "i/no-self-import": "error",
  "i/no-relative-packages": "error",
  "i/no-named-as-default": "off",
  "i/no-named-as-default-member": "off",
  "i/no-extraneous-dependencies": "warn",
  "i/no-unused-modules": "warn",
  "i/no-amd": "error",
  "i/no-import-module-exports": "error",
  "i/first": "error",
  "i/extensions": ["error", "always"],
  "i/order": "warn",
  "i/newline-after-import": "warn",
  "i/no-named-default": "error",
  "i/no-anonymous-default-export": [
    "warn",
    {"allowCallExpression": true},
  ],
};

const DEFAULT_CYCLE_DEPTH = 3;

module.exports = {
  plugins: ["i"],
  dependencies: ["eslint-plugin-i"],
  rules: presetConfig => {
    let importDepth;
    if (
      presetConfig === true
      || presetConfig.detectImportCycle === true
    ) {
      importDepth = DEFAULT_CYCLE_DEPTH;
    } else if (typeof presetConfig.detectImportCycle === "number") {
      importDepth = presetConfig.detectImportCycle;
    }
    const importCycleRule = importDepth === undefined
      ? undefined
      : (
        {
          "i/no-cycle": [
            "error",
            {
              ignoreExternal: true,
              maxDepth: importDepth,
            },
          ],
        }
      );
    return {
      ...base,
      ...importCycleRule,
    };
  },
};
