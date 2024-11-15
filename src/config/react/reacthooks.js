import {fixupPluginRules} from "@eslint/compat";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

import {getReactFullConfig} from "../reactfullconfig.js";

export const apply = (configResult, eslintConfig) => {
  const reactCfg = getReactFullConfig(eslintConfig.react);
  if (!reactCfg.reactHooks) return;
  configResult.push({
    files: ["src/webapp/**/*.js", "**/*.jsx", "**/*.tsx"],
    name: "react-hooks/recommended",
    plugins: {"react-hooks": fixupPluginRules(eslintPluginReactHooks)},
    rules: {"react-hooks/rules-of-hooks": "error", "react-hooks/exhaustive-deps": "warn"},
  });
};
