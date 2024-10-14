/* eslint-disable no-magic-numbers */
import js from "@eslint/js";

import {addDependency} from "../dependencies.js";

import * as sections from "../sections.js";

/**
 * Apply the recommended eslint configuration plus KeeeX tweaks.
 *
 * param configResult - The eslint configuration object currently being built.
 */
// eslint-disable-next-line max-lines-per-function
export const apply = (configResult, eslintConfig) => {
  addDependency("eslint");
  addDependency("@eslint/js");
  // Basic options
  const sharedSection = sections.getNamedSection(configResult, "shared");
  sections.sectionAddOption(sharedSection, "linterOptions", "reportUnusedDisableDirectives", true);
  // Global ignores
  if (eslintConfig.ignores.length > 0) {
    const globalIgnores = sections.getNamedSection(configResult, "ignores");
    globalIgnores.ignores = [...eslintConfig.ignores];
  }
  // Base eslint
  configResult.push(js.configs.recommended);
  const eslintCustom = sections.getNamedSection(configResult, "eslint-recommended-override");
  sections.configureRules(
    eslintCustom,
    {
      "array-callback-return": "error",
      "arrow-body-style": ["error", "as-needed"],
      "block-scoped-var": "warn",
      "camelcase": "warn",
      "class-methods-use-this": ["warn", {exceptMethods: ["render"]}],
      "complexity": ["warn", {max: 25, variant: "modified"}],
      "curly": ["error", "multi-line"],
      "eqeqeq": "warn",
      "func-style": "error",
      "guard-for-in": "warn",
      "max-classes-per-file": "error",
      "max-depth": ["warn", 5],
      "max-lines": ["warn", {max: 1000, skipBlankLines: true, skipComments: true}],
      "max-lines-per-function": [
        "warn",
        {IIFEs: true, max: 60, skipBlankLines: true, skipComments: true},
      ],
      "max-nested-callbacks": ["warn", 6],
      "max-params": ["warn", 5],
      "no-alert": "error",
      "no-array-constructor": "error",
      "no-await-in-loop": "warn",
      "no-caller": "error",
      "no-console": "warn",
      "no-constant-condition": "warn",
      "no-constructor-return": "error",
      "no-delete-var": "error",
      "no-div-regex": "warn",
      "no-duplicate-imports": "error",
      "no-else-return": "warn",
      "no-eq-null": "error",
      "no-eval": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-extra-label": "warn",
      "no-implicit-coercion": "warn",
      "no-implied-eval": "error",
      "no-invalid-this": "error",
      "no-irregular-whitespace": [
        "error",
        {
          skipComments: true,
          skipJSXText: true,
          skipRegExps: true,
          skipStrings: true,
          skipTemplates: true,
        },
      ],
      "no-iterator": "error",
      "no-label-var": "error",
      "no-lonely-if": "warn",
      "no-loop-func": "warn",
      "no-magic-numbers": [
        "warn",
        {
          ignore: [1, -1, "1n", "-1n", 0, "0n"],
          ignoreClassFieldInitialValues: true,
          ignoreDefaultValues: true,
        },
      ],
      "no-multi-assign": "error",
      "no-negated-condition": "warn",
      "no-nested-ternary": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-object-constructor": "error",
      "no-promise-executor-return": "error",
      "no-self-compare": "warn",
      "no-unmodified-loop-condition": "warn",
      "no-unreachable-loop": "warn",
      "no-use-before-define": "warn",
      "no-useless-assignment": "warn",
      "no-param-reassign": "warn",
      "no-proto": "error",
      "no-return-assign": "error",
      "no-script-url": "error",
      "no-sequences": "warn",
      "no-shadow": "warn",
      "no-throw-literal": "error",
      "no-undef-init": "warn",
      "no-undefined": "error",
      "no-unneeded-ternary": "warn",
      "no-unused-expressions": "warn",
      "no-useless-call": "error",
      "no-useless-computed-key": "warn",
      "no-useless-concat": "warn",
      "no-useless-constructor": "warn",
      "no-useless-rename": "warn",
      "no-useless-return": "warn",
      "no-var": "error",
      "no-void": ["error", {allowAsStatement: true}],
      "one-var": ["warn", "never"],
      "prefer-arrow-callback": "warn",
      "prefer-const": ["warn", {ignoreReadBeforeAssign: true}],
      "prefer-exponentiation-operator": "warn",
      "prefer-named-capture-group": "warn",
      "prefer-numeric-literals": "warn",
      "prefer-object-has-own": "warn",
      "prefer-object-spread": "warn",
      "prefer-promise-reject-errors": "error",
      "prefer-regex-literals": "warn",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "warn",
      "radix": ["warn", "as-needed"],
      "require-atomic-updates": "warn",
      "require-await": "warn",
      "require-unicode-regexp": "warn",
      "sort-imports": ["warn", {ignoreCase: true, allowSeparatedGroups: true}],
      "sort-keys": ["warn", "asc", {caseSensitive: false, minKeys: 3, natural: true}],
      "symbol-description": "error",
    },
  );
};
