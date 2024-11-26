import mochaPlugin from "eslint-plugin-mocha";

import {getEnvDirectories} from "../pathutils.js";
import * as sections from "../sections.js";

export const apply = (configResult, eslintConfig) => {
  if (!eslintConfig.mocha) return;
  const files = getEnvDirectories(eslintConfig.environments, "mocha");
  const mochaSection = {...mochaPlugin.configs.flat.recommended, files};
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
  });
  if (eslintConfig.typescript) {
    sections.configureRules(override, "@typescript-eslint", {
      "max-params": "off",
      "no-magic-numbers": "off",
    });
  }
};
