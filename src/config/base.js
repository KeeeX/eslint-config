import js from "@eslint/js";
import {addDependency} from "../dependencies.js";
import * as sections from "../sections.js";

/**
 * Apply the recommended eslint configuration plus KeeeX tweaks.
 *
 * param configResult - The eslint configuration object currently being built.
 */
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
      "no-await-in-loop": "warn",
      "no-console": "warn",
      "no-constant-condition": "warn",
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-irregular-whitespace": [
        "error",
        {
          skipStrings: true,
          skipComments: true,
          skipRegExps: true,
          skipTemplates: true,
          skipJSXText: true,
        },
      ],
      "no-promise-executor-return": "error",
      "no-self-compare": "warn",
      "no-unmodified-loop-conditions": "warn",
      "no-unreachable-loop": "warn",
      "no-use-before-define": "warn",
      "no-useless-assignment": "warn",
      "require-atomic-updates": "warn",
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
        {max: 60, skipBlankLines: true, skipComments: true, IIFEs: true},
      ],
    },
  );
};
