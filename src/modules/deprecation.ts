// #region Imports
import * as eslint from "eslint";
import deprecationPlugin from "eslint-plugin-deprecation";
import {ConfigWithDefault} from "../config.js";
import {tsFileFilters} from "./common.js";
// #endregion

// #region Config
const get = (config: ConfigWithDefault): Array<eslint.Linter.FlatConfig> | null => {
  if (!config.deprecation) return null;
  const res: Array<eslint.Linter.FlatConfig> = [{
    plugins: {"deprecation": deprecationPlugin as unknown as eslint.ESLint.Plugin},
    files: tsFileFilters,
    rules: deprecationPlugin.configs.recommended.rules as eslint.Linter.RulesRecord,
  }];
  return res;
};

export default get;
// #endregion
