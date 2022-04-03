const base = {
  "import/default": "off",
  "import/namespace": "off",
  "import/no-absolute-path": "error",
  "import/no-dynamic-require": "error",
  "import/no-webpack-loader-syntax": "error",
  "import/no-self-import": "error",
  "import/no-relative-packages": "error",
  "import/no-named-as-default": "off",
  "import/no-named-as-default-member": "off",
  "import/no-extraneous-dependencies": "warn",
  "import/no-unused-modules": "warn",
  "import/no-amd": "error",
  "import/no-import-module-exports": "error",
  "import/first": "error",
  "import/extensions": ["error", "always"],
  "import/order": "warn",
  "import/newline-after-import": "warn",
  "import/no-named-default": "error",
  "import/no-anonymous-default-export": [
    "warn",
    {"allowCallExpression": true},
  ],
};

const DEFAULT_CYCLE_DEPTH = 3;

module.exports = {
  plugins: ["import"],
  extendsBase: ["plugin:import/recommended"],
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
          "import/no-cycle": [
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
