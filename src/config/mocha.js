import mochaPlugin from "eslint-plugin-mocha";

import {getEnvDirectories} from "../pathutils.js";
import * as sections from "../sections.js";

export const apply = (configResult, eslintConfig) => {
  if (!eslintConfig.mocha) return;
  let files = getEnvDirectories("mocha", eslintConfig.environments);
  if (!files || files.length === 0) files = ["src/**/*.test.*", "src/tests/**/*"];
  const mochaBase = mochaPlugin.configs.flat?.recommended ?? mochaPlugin.configs.recommended;
  const mochaSection = {...mochaBase, files};
  configResult.push(mochaSection);
  const override = sections.getNamedSection(configResult, "keeex/mocha");
  override.files = files;
  sections.configureRules(override, "", {
    "max-classes-per-file": "off",
    "max-lines": "off",
    "max-lines-per-function": "off",
    "max-params": "off",
    "no-invalid-this": "off",
    "no-magic-numbers": "off",
    "no-setup-in-describe": "off",
    "prefer-arrow-callback": "off",
    "sort-keys": "off",
  });
  sections.configureRules(override, "mocha", {
    "consistent-spacing-between-blocks": "off",
    "no-exports": "off",
    "no-setup-in-describe": "off",
    "no-top-level-hooks": "off",
  });
  if (eslintConfig.typescript) {
    sections.configureRules(override, "@typescript-eslint", {
      "class-methods-use-this": "off",
      "explicit-function-return-type": "off",
      "init-declarations": "off",
      "max-params": "off",
      "no-magic-numbers": "off",
    });
  }
};
