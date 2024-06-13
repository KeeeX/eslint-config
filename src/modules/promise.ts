// #region Imports
import * as eslint from "eslint";
import {FlatCompat} from "@eslint/eslintrc"
import {fixupConfigRules} from "@eslint/compat"
import {ConfigWithDefault} from "../config.js";
// #endregion

// Taken from https://github.com/eslint-community/eslint-plugin-promise/issues/449#issuecomment-2108572139
// Until eslint-plugin-promise actually supports flat config

// #region Consts
const compat = new FlatCompat()
// #endregion

// #region Config
const get = (config: ConfigWithDefault): Array<eslint.Linter.FlatConfig> | null => {
  if (!config.promise) return null;
  return [
    /*
    To make the promise plugin work with ESLint v9 we have to use
    1. fixupConfigRules to fix obsolete rules API usages
    2. FlatCompat to convert the plugin's config format to the v9 flat format
    */
    ...fixupConfigRules(
      compat.config({
        extends: ["plugin:promise/recommended"],
        ignorePatterns: ["tests/e2e"]
      })
    ),
    {
      name: "keeex-eslint-promise",
      rules: {
        "promise/always-return": ["off"],
        "promise/no-callback-in-promise": ["off"],
      }
    },
  ];
};

export default get;
// #endregion
