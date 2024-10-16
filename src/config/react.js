/* eslint-disable no-magic-numbers */
import reactPlugin from "eslint-plugin-react";

import * as sections from "../sections.js";

import {getReactFullConfig} from "./reactfullconfig.js";

// eslint-disable-next-line max-lines-per-function
export const apply = (configResult, eslintConfig) => {
  const reactCfg = getReactFullConfig(eslintConfig.react);
  if (!reactCfg.react) return;
  configResult.push(
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat["jsx-runtime"],
  );
  const override = sections.getNamedSection(configResult, "keeex/react");
  sections.sectionAddOption(override, "settings", "react", {version: "detect"});
  sections.configureRules(
    override,
    "react",
    {
      "button-has-type": "warn",
      "checked-requires-onchange-or-readonly": "warn",
      "forward-ref-uses-ref": "warn",
      "hook-use-state": "error",
      "iframe-missing-sandbox": "error",
      "jsx-boolean-value": "warn",
      "jsx-child-element-spacing": "warn",
      "jsx-curly-brace-presence": [
        "error",
        {
          children: "never",
          propElementValues: "always",
          props: "never",
        },
      ],
      "jsx-curly-newline": "warn",
      "jsx-curly-spacing": "warn",
      "jsx-equals-spacing": "warn",
      "jsx-filename-extension": ["error", {extensions: [".js", ".tsx"]}],
      "jsx-fragments": "error",
      "jsx-handler-names": "warn",
      "jsx-indent": ["error", 2],
      "jsx-indent-props": ["error", 2],
      "jsx-max-depth": ["warn", {max: 8}],
      "jsx-no-bind": "error",
      "jsx-no-constructed-context-values": "error",
      "jsx-no-leaked-render": "warn",
      "jsx-no-script-url": "error",
      "jsx-no-useless-fragment": "warn",
      "jsx-pascal-case": ["warn", {allowNamespace: true}],
      "jsx-sort-props": ["warn", { ignoreCase: true}],
      "jsx-tag-spacing": ["warn", {beforeClosing: "never"}],
      "no-access-state-in-setstate": "error",
      "no-array-index-key": "warn",
      "no-arrow-function-lifecycle": "off",
      "no-danger": "error",
      "no-invalid-html-attribute": "error",
      "no-namespace": "error",
      "no-redundant-should-component-update": "error",
      "no-this-in-sfc": "error",
      "no-typos": "error",
      "no-unsafe": "error",
      "no-unstable-nested-components": "error",
      "no-unused-class-component-methods": "warn",
      "no-unused-state": "warn",
      "prefer-es6-class": ["error"],
      "require-optimization": "warn",
      "self-closing-comp": "error",
      "state-in-constructor": ["error"],
      "void-dom-elements-no-children": "error",
    },
  );
};
