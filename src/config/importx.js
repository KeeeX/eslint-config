import eslintPluginImportX from "eslint-plugin-import-x";

import * as sections from "../sections.js";

/**
 * Apply the import-x configs
 * 
 * @param configResult - The eslint configuration object currently being built.
 */
// eslint-disable-next-line max-lines-per-function
export const apply = (configResult, eslintConfig) => {
  if (eslintConfig.import === false) return;
  configResult.push({
    ...eslintPluginImportX.flatConfigs.recommended,
    languageOptions: {},
  });
  if (eslintConfig.typescript) {
    configResult.push({
      ...eslintPluginImportX.flatConfigs.typescript,
      name: "import-x/recommended",
    });
  }
  const override = sections.getNamedSection(configResult, "keeex/importx-override");
  sections.configureRules(
    override,
    "import-x",
    {
      "first": "error",
      "newline-after-import": "warn",
      "no-amd": "error",
      "no-anonymous-default-export": "warn",
      "no-commonjs": "error",
      "no-empty-named-blocks": "warn",
      "no-named-default": "error",
      "no-self-import": "error",
      "no-unresolved": "warn",
      "no-useless-path-segments": "warn",
      "order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
            "unknown",
          ],
          "newlines-between": "always-and-inside-groups",
        },
      ],
    },
  );
  if (!eslintConfig.noBase) {
    const baseSection = sections.getNamedSection(configResult, "keeex/eslint-override");
    sections.configureRules(baseSection, "", {"sort-imports": "off"});
  }
  if (typeof eslintConfig.import === "number" && eslintConfig.import > 0) {
    sections.configureRules(
      override,
      "import-x",
      {
        "no-cycle": ["error", {maxDepth: eslintConfig.import}],
      },
    );
  } else if (eslintConfig.import) {
    sections.configureRules(override, "import-x", {"no-cycle": "error"});
  }
  if (eslintConfig.typescript) {
    sections.configureRules(
      override,
      "import-x",
      {"no-extraneous-dependencies": ["error", {includeTypes: true}]},
    );
    if (eslintConfig.react) {
      sections.sectionAddOption(override, "settings", "import-x/extensions", [".ts", ".tsx"]);
    } else {
      sections.sectionAddOption(override, "settings", "import-x/extensions", [".ts"]);
    }
  } else {
    sections.configureRules(
      override,
      "import-x",
      {
        "extensions": ["error", "ignorePackages"],
        "no-deprecated": "warn",
        "no-extraneous-dependencies": "error",
      },
    );
    if (eslintConfig.react) {
      sections.sectionAddOption(override, "settings", "import-x/extensions", [".js", ".jsx"]);
    }
  }
  if (eslintConfig.typescript) {
    sections.sectionAddOption(override, "settings", "import-x/resolver", "typescript");
  }
  if (eslintConfig.react) {
    const webOverride = sections.getNamedSection(configResult, "keeex/importx-override-webapp");
    webOverride.files = ["src/webapp"];
    sections.sectionAddOption(webOverride, "settings", "import-x/resolver", "webpack");
  }
};
