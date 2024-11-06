import mochaPlugin from "eslint-plugin-mocha";

import {getFiles} from "../pathutils.js";
import * as sections from "../sections.js";

export const apply = (configResult, eslintConfig) => {
  if (!eslintConfig.mocha) return;
  const fileTypes = {
    javascript: true,
    jsx: Boolean(eslintConfig.react),
    typescript: eslintConfig.typescript,
  };
  const mochaFilter = getFiles([
    {
      filePatterns: "*.ext",
      fileTypes,
      recursiveDirectories: "src/tests",
    },
    {
      filePatterns: "*.test.ext",
      fileTypes,
      recursiveDirectories: "src",
    },
  ]);
  const mochaSection = {
    ...mochaPlugin.configs.flat.recommended,
    files: mochaFilter,
  };
  configResult.push(mochaSection);
  const override = sections.getNamedSection(configResult, "keeex/mocha");
  override.files = mochaFilter;
  sections.configureRules(override, "", {
    "max-classes-per-file": "off",
    "max-lines": "off",
    "max-lines-per-function": "off",
    "max-params": "off",
    "no-magic-numbers": "off",
    "prefer-arrow-callback": "off",
  });
  if (eslintConfig.typescript) {
    sections.configureRules(override, "@typescript-eslint", {
      "max-params": "off",
      "no-magic-numbers": "off",
    });
  }
};
