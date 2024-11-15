import eslintPluginImportX from "eslint-plugin-import-x";

import * as pathutils from "../pathutils.js";
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
      name: "import-x/typescript-recommended",
    });
  }
  const override = sections.getNamedSection(configResult, "keeex/importx-override");
  sections.configureRules(override, "import-x", {
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
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
        "groups": [
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
  });
  if (!eslintConfig.noBase) {
    const baseSection = sections.getNamedSection(configResult, "keeex/eslint-override");
    sections.configureRules(baseSection, "", {"sort-imports": "off"});
  }
  if (typeof eslintConfig.import === "number" && eslintConfig.import > 0) {
    sections.configureRules(override, "import-x", {
      "no-cycle": ["error", {maxDepth: eslintConfig.import}],
    });
  } else if (eslintConfig.import) {
    sections.configureRules(override, "import-x", {"no-cycle": "error"});
  }
  if (eslintConfig.typescript) {
    const tsOverride = sections.getNamedSection(configResult, "keeex/importx-override-typescript");
    sections.configureRules(tsOverride, "import-x", {
      "default": "off",
      "namespace": "off",
      "no-extraneous-dependencies": ["error", {includeTypes: true}],
      "no-named-as-default-member": "off",
      "no-unresolved": "off",
    });
    if (eslintConfig.react) {
      sections.sectionAddOption(tsOverride, "settings", "import-x/extensions", [".ts", ".tsx"]);
    } else {
      sections.sectionAddOption(tsOverride, "settings", "import-x/extensions", [".ts"]);
    }
  } else {
    sections.configureRules(override, "import-x", {
      "extensions": ["error", "ignorePackages"],
      "no-deprecated": "warn",
      "no-extraneous-dependencies": "error",
    });
    if (eslintConfig.react) {
      sections.sectionAddOption(override, "settings", "import-x/extensions", [".js", ".jsx"]);
    }
  }
  if (eslintConfig.typescript) {
    sections.sectionAddOption(override, "settings", "import-x/resolver", "typescript");
  }
  if (eslintConfig.react) {
    const webOverride = sections.getNamedSection(configResult, "keeex/importx-override-webapp");
    webOverride.files = pathutils.getFilesEnv(
      eslintConfig,
      ["webapp", "mobile"],
      undefined,
      {
        cjs: true,
        esm: true,
        javascript: true,
        jsx: true,
        typescript: Boolean(eslintConfig.typescript),
      },
      "src/webapp",
    );
    sections.sectionAddOption(webOverride, "settings", "import-x/resolver", "webpack");
  }
  const overrideCjs = sections.getNamedSection(configResult, "keeex/importx-override-cjs");
  overrideCjs.files = pathutils.getFiles({
    recursiveDirectories: "",
    fileTypes: {
      cjs: true,
      esm: false,
      javascript: true,
      jsx: Boolean(eslintConfig.react),
      typescript: Boolean(eslintConfig.typescript),
    },
  });
  sections.configureRules(overrideCjs, "import-x", {"no-commonjs": "off"});
};
