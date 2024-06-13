// #region Imports
import * as eslint from "eslint";
import importPlugin from "eslint-plugin-import-x";
import {ConfigWithDefault} from "../config.js";
import {tsFileFilters} from "./common.js";
// #endregion

// #region Consts
const DEFAULT_CYCLE_DEPTH = 3;
// #endregion

// #region Config
const get = (config: ConfigWithDefault): Array<eslint.Linter.FlatConfig> | null => {
  if (!config.import) return null;
  const res: Array<eslint.Linter.FlatConfig> = [
    {
      name: "keeex-eslint-import-x",
      plugins: {"import-x": importPlugin as unknown as eslint.ESLint.Plugin},
      rules: {
        "i/no-unresolved": "error",
        "i/named": "error",
        "i/export": "error",
        "i/no-duplicates": "warn",
        "i/default": "off",
        "i/namespace": "off",
        "i/no-absolute-path": "error",
        "i/no-dynamic-require": "error",
        "i/no-webpack-loader-syntax": "error",
        "i/no-self-import": "error",
        "i/no-relative-packages": "error",
        "i/no-named-as-default": "off",
        "i/no-named-as-default-member": "off",
        "i/no-extraneous-dependencies": "warn",
        "i/no-unused-modules": "warn",
        "i/no-amd": "error",
        "i/no-import-module-exports": "error",
        "i/first": "error",
        "i/extensions": ["error", "always"],
        "i/order": "warn",
        "i/newline-after-import": "warn",
        "i/no-named-default": "error",
        "i/no-anonymous-default-export": [
          "warn",
          {"allowCallExpression": true},
        ],
      }
    },
  ];
  if (config.import.detectImportCycle) {
    res.push({
      name: "keeex-eslint-import-x-cycle",
      rules: {
        "i/no-cycle": [
          "error",
          { ignoreExternal: true, maxDepth: DEFAULT_CYCLE_DEPTH, },
        ],
      }
    });
  }
  if (config.typescript) {
    res.push({
      name: "keeex-eslint-import-x-typescript",
      files: tsFileFilters,
      ...importPlugin.configs.typescript,
    });
  }
  return res;
};

export default get;
// #endregion
