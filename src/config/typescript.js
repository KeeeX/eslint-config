// Uses exports
// eslint-disable-next-line import-x/no-unresolved
import tseslint from "typescript-eslint";

import * as sections from "../sections.js";

/**
 * Apply the recommended typescript-eslint configuration plus KeeeX tweaks.
 *
 * @param configResult - The eslint configuration object currently being built.
 */
// eslint-disable-next-line max-lines-per-function
export const apply = (configResult, eslintConfig) => {
  if (!eslintConfig.typescript) return;
  configResult.push(
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  );
  if (!eslintConfig.noBase) configResult.push(tseslint.configs.eslintRecommended);
  const section = sections.getNamedSection(configResult, "keeex/typescript-parserOptions");
  sections.sectionAddOption(
    section,
    "languageOptions",
    "parserOptions",
    {
      projectService: true,
      tsConfigRootDir: import.meta.dirname,
    },
  );
  const override = sections.getNamedSection(configResult, "keeex/typescript-override");
  override.files = ["**/*.ts", "**/*.tsx"];
  const eslintOverride = sections.getNamedSection(configResult, "keeex/eslint-override");
  const overrule = (name, defaultValue = "error") => sections.configureRules(
    override,
    "",
    {
      [name]: "off",
      [`@typescript-eslint/${name}`]: eslintOverride.rules?.[name] ?? defaultValue,
    },
  );
  sections.configureRules(
    override,
    "@typescript-eslint",
    {
      "array-type": ["error", {default: "generic", readonly: "generic"}],
      "explicit-function-return-type": "warn",
      "explicit-member-accessibility": "error",
      "explicit-module-boundary-types": "error",
      "naming-convention": "error",
      "no-deprecated": "warn",
      "no-dynamic-delete": "warn",
      "no-unnecessary-boolean-literal-compare": "warn",
      "no-unnecessary-condition": ["warn", {allowConstantLoopConditions: true}],
      "no-unnecessary-template-expression": "warn",
      "parameter-properties": "error",
      "prefer-readonly": "warn",
      "prefer-return-this-type": "warn",
      "return-await": "error",
      "unified-signatures": "error",
    },
  );
  for (const baseRule of [
    "class-methods-use-this",
    "default-param-last",
    "dot-notation",
    "init-declarations",
    "max-params",
    "no-array-constructor",
    "no-implied-eval",
    "no-loop-func",
    "no-magic-numbers",
    "no-shadow",
    "no-unused-expressions",
    "no-unused-vars",
    "no-use-before-define",
    "no-useless-constructor",
    "prefer-destructuring",
    "prefer-promise-reject-errors",
    "require-await",
  ]) {
    overrule(baseRule);
  }
  sections.configureRules(override, "", {"no-return-await": "off"});
};
