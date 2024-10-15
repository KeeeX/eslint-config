// Uses exports
// eslint-disable-next-line import-x/no-unresolved
import tseslint from "typescript-eslint";

import * as sections from "../sections.js";

/**
 * Apply the recommended typescript-eslint configuration plus KeeeX tweaks.
 *
 * @param configResult - The eslint configuration object currently being built.
 */
export const apply = (configResult, eslintConfig) => {
  if (!eslintConfig.typescript) return;
  configResult.push(
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  );
  if (!eslintConfig.noBase) configResult.push(tseslint.configs.eslintRecommended);
  const section = sections.getNamedSection(configResult, "typescript-parserOptions");
  sections.sectionAddOption(
    section,
    "languageOptions",
    "parserOptions",
    {
      projectService: true,
      tsConfigRootDir: import.meta.dirname,
    },
  );
};
