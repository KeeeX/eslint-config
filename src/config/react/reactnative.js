import {fixupPluginRules} from "@eslint/compat";

import reactNative from "eslint-plugin-react-native";

import * as sections from "../../sections.js";
import {getReactFullConfig} from "../reactfullconfig.js";

export const apply = (configResult, eslintConfig) => {
  const reactCfg = getReactFullConfig(eslintConfig.react);
  if (!reactCfg.reactNative) return;
  const reactNativeSection = sections.getNamedSection(configResult, "keeex/react-native");
  reactNativeSection.plugins = {"react-native": fixupPluginRules(reactNative)};
  sections.configureRules(
    reactNativeSection,
    "react-native",
    {
      "no-color-literals": "warn",
      "no-inline-styles": "warn",
      "no-raw-text": "error",
      "no-single-element-style-arrays": "error",
      "no-unused-styles": "warn",
      "sort-styles": "warn",
      "split-platform-components": "warn",
    },
  );
}
