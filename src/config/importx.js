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
  if (eslintConfig.typescript) configResult.push(eslintPluginImportX.flatConfigs.typescript);
  const override = sections.getNamedSection(configResult, "importx-override");
  sections.configureRules(
    override,
    {
      "import-x/extensions": ["error", "ignorePackages"],
      "import-x/first": "error",
      "import-x/newline-after-import": "warn",
      "import-x/no-amd": "error",
      "import-x/no-anonymous-default-export": "warn",
      "import-x/no-commonjs": "error",
      "import-x/no-empty-named-blocks": "warn",
      "import-x/no-named-default": "error",
      "import-x/no-self-import": "error",
      "import-x/no-unresolved": "warn",
      "import-x/no-useless-path-segments": "warn",
      "import-x/order": [
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
    const baseSection = sections.getNamedSection(configResult, "eslint-recommended-override");
    sections.configureRules(baseSection, {"sort-imports": "off"});
  }
  if (typeof eslintConfig.import === "number") {
    sections.configureRules(
      override,
      {
        "import-x/no-cycle": ["error", {maxDepth: eslintConfig.import}],
      },
    );
  } else {
    sections.configureRules(override, {"import-x/no-cycle": "error"});
  }
  if (eslintConfig.typescript) {
    sections.configureRules(
      override,
      {"import-x/no-extraneous-dependencies": ["error", {includeTypes: true}]},
    );
    if (eslintConfig.react) {
      sections.sectionAddOption(override, "settings", "import-x/extensions", [".ts", ".tsx"]);
    } else {
      sections.sectionAddOption(override, "settings", "import-x/extensions", [".ts"]);
    }
  } else {
    sections.configureRules(
      override,
      {
        "import-x/no-deprecated": "warn",
        "import-x/no-extraneous-dependencies": "error",
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
    const webOverride = sections.getNamedSection(configResult, "importx-webpack-override");
    webOverride.files = ["src/webapp"];
    sections.sectionAddOption(webOverride, "settings", "import-x/resolver", "webpack");
  }
};
