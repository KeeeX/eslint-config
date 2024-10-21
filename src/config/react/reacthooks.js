import eslintPluginReactHooks from "eslint-plugin-react-hooks";

import {getReactFullConfig} from "../reactfullconfig.js";

export const apply = (configResult, eslintConfig) => {
  const reactCfg = getReactFullConfig(eslintConfig.react);
  if (!reactCfg.reactHooks) return;
  configResult.push({
    ...eslintPluginReactHooks.configs.recommended,
    files: ["src/webapp/**/*.js", "**/*.jsx", "**/*.tsx"],
    name: "react-hooks/recommended",
  });
}
