// #region Imports
import * as eslint from "eslint";
import * as common from "./common.js";
import mochaPlugin from "eslint-plugin-mocha";
import {ConfigWithDefault} from "../config.js";
// #endregion

// #region Config
const get = (config: ConfigWithDefault): Array<eslint.Linter.FlatConfig> | null => {
  if (config.mocha === false) return null;
  const res: Array<eslint.Linter.FlatConfig> = [
    {
      name: "keeex-eslint-mocha",
      ...mochaPlugin.configs.flat.recommended,
      files: config.mocha.fileFilter,
      rules: {
        ...mochaPlugin.configs.flat.recommended.rules,
        "mocha/handle-done-callback": ["error", {"ignoreSkipped": true}],
        "mocha/no-mocha-arrows": "off",
        "prefer-arrow-callback": "off",
        "mocha/prefer-arrow-callback": ["warn", {"allowUnboundThis": false}],
        "func-names": "off",
        "no-invalid-this": "off",
      },
    },
  ];
  if (config.mocha.expectHelper) {
    res.push({
      name: "keeex-eslint-mocha-expect",
      files: config.mocha.fileFilter,
      rules: {"no-unused-expressions": "off"},
    });
    if (config.typescript) {
      res.push({
        name: "keeex-eslint-mocha-expect-typescript",
        files: config.mocha.fileFilter,
        rules: {
          "@typescript-eslint/no-unused-expressions": "off",
          "@typescript-eslint/no-non-null-assertion": "off",
        },
      });
    }
  }
  return res;
};

export default get;
// #endregion
