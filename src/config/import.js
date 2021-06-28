module.exports = {
  plugins: ["import"],
  extendsBase: (presetConfig, allOptions) => {
    const result = ["plugin:promise/recommended"];
    if (allOptions.typescript) {
      result.push(["plugin:import/typescrypt"]);
    }
    return result;
  },
  rules: {
    "import/default": "off",
    "import/namespace": "off",
    "import/no-absolute-path": "error",
    "import/no-dynamic-require": "error",
    "import/no-webpack-loader-syntax": "error",
    "import/no-self-import": "error",
    "import/no-cycle": [
      "error",
      {
        ignoreExternal: true,
        maxDepth: 3,
      },
    ],
    "import/no-relative-packages": "error",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-extraneous-dependencies": "warn",
    "import/no-unused-modules": "warn",
    "import/no-amd": "error",
    "import/no-import-module-exports": "error",
    "import/first": "error",
    "import/extensions": [
      "error",
      {
        ignorePackages: true,
        pattern: {
          "js": "always",
          "json": "always",
        },
      },
    ],
    "import/order": "warn",
    "import/newline-after-import": "warn",
    "import/no-named-default": "error",
    "import/no-anonymous-default-export": [
      "warn",
      {"allowCallExpression": true},
    ],
  },
};
