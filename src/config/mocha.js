import mochaPlugin from "eslint-plugin-mocha";

import * as sections from "../sections.js";

export const apply = (configResult, eslintConfig) => {
  if (!eslintConfig.mocha) return;
  const mochaFilter = ["src/tests/**/*", "**/*.test.*"];
  const mochaSection = {
    ...mochaPlugin.configs.flat.recommended,
    files: mochaFilter,
  };
  sections.configureRules(
    mochaSection,
    "",
    {
      "max-classes-per-file": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      "max-params": "off",
      "no-magic-numbers": "off",
    },
  );
  if (eslintConfig.typescript) {
    sections.configureRules(
      mochaSection,
      "@typescript-eslint",
      {
        "max-params": "off",
        "no-magic-numbers": "off",
      },
    );
  }
  configResult.push(mochaSection);
};
