// #region Imports
import {Linter} from "eslint";
import getConfig, {KeeexEslintConfig} from "./config.js";
import getBase from "./modules/base.js";
import getDeprecation from "./modules/deprecation.js";
import getImport from "./modules/import.js";
import getJsx from "./modules/jsx.js";
import getMocha from "./modules/mocha.js";
import getPromise from "./modules/promise.js";
import getReactHooks from "./modules/reacthooks.js";
import getReactNative from "./modules/reactnative.js";
import getTypeScript from "./modules/typescript.js";
// #endregion

// #region Main
const getEslintConfig = (userConfig: KeeexEslintConfig): Array<Linter.FlatConfig> => {
  const cfg = getConfig(userConfig);
  return [
    {
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    ...getBase(cfg),
    ...[
      getTypeScript(cfg),
      getJsx(cfg),
      getDeprecation(cfg),
      getImport(cfg),
      getMocha(cfg),
      getPromise(cfg),
      getReactHooks(cfg),
      getReactNative(cfg),
    ].map(c => c ?? [])
      .flat(),
  ];
};
// #endregion
