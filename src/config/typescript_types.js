// This file is merged into typescript.js on use
module.exports = {
  extendsBase:
    ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
  rules: {
    "@typescript-eslint/naming-convention": ["warn"],
    "@typescript-eslint/no-floating-promises": ["error"],
    "no-implied-eval": "off",
    "@typescript-eslint/no-implied-eval": ["error"],
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": ["error"],
    "@typescript-eslint/no-unnecessary-condition": ["error"],
    "@typescript-eslint/no-unnecessary-qualifier": ["error"],
    "@typescript-eslint/no-unnecessary-type-arguments": ["warn"],
    "@typescript-eslint/no-unused-vars-experimental": ["warn"],
    "@typescript-eslint/prefer-nullish-coalescing": ["warn"],
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      {"checkCompoundAssignments": true},
    ],
    "@typescript-eslint/switch-exhaustiveness-check": ["warn"],
    "require-await": "off",
    "@typescript-eslint/require-await": ["warn"],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/unbound-method": [
      "error",
      {ignoreStatics: true},
    ],
  },
};
