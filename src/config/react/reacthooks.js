import eslintPluginReactHooks from "eslint-plugin-react-hooks";

import * as sections from "../../sections.js";
import {getReactFullConfig} from "../reactfullconfig.js";

export const apply = (configResult, eslintConfig) => {
  const reactCfg = getReactFullConfig(eslintConfig.react);
  if (!reactCfg.reactHooks) return;
  const rnSection = sections.getNamedSection(configResult, "keeex/react-native");
  configResult.push({
    ...eslintPluginReactHooks.flatConfigs.recommended,
    files: ["src/webapp/**/*.js", "**/*.jsx", "**/*.tsx"],
  });
}
