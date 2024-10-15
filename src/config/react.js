import reactPlugin from "eslint-plugin-react";

import * as sections from "../sections.js";

export const apply = (configResult, eslintConfig) => {
  if (!eslintConfig.react) return;
  configResult.push(
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
  );
  const override = sections.getNamedSection(configResult, "keeex/react");
  sections.configureRules(
    override,
    "react",
    {
      
    },
  );
};
