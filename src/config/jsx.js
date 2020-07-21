const {jsxIndent} = require("./common");

module.exports = {
  settings: presetConfig => {
    const version = typeof presetConfig === "string"
      ? presetConfig
      : "detect";
    return {"react": {version}};
  },
  extendsBase: ["plugin:react/recommended"],
  rules: {
    "react/button-has-type": ["error"],
    "react/default-props-match-prop-types": ["warn"],
    "react/destructuring-assignment": ["off"],
    "react/display-name": [
      "warn",
      {"ignoreTranspilerName": true},
    ],
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function",
      },
    ],
    "react/no-access-state-in-setstate": ["error"],
    "react/no-adjacent-inline-elements": ["warn"],
    "react/no-array-index-key": ["error"],
    "react/no-danger": ["warn"],
    "react/no-did-mount-set-state": ["error"],
    "react/no-did-update-set-state": ["error"],
    "react/no-multi-comp": [
      "error",
      {"ignoreStateless": true},
    ],
    "react/no-redundant-should-component-update": ["error"],
    "react/no-this-in-sfc": ["error"],
    "react/no-typos": ["error"],
    "react/no-unescaped-entities": [
      "error",
      {
        forbid: [
          {
            char: ">",
            alternatives: ["&gt;"],
          },
          {
            char: "}",
            alternatives: ["&#125;"],
          },
        ],
      },
    ],
    "react/no-unsafe": [
      "error",
      {"checkAliases": true},
    ],
    "react/no-unused-prop-types": ["error"],
    "react/no-unused-state": ["warn"],
    "react/no-will-update-set-state": ["error"],
    "react/prefer-es6-class": ["warn"],
    "react/require-default-props": ["warn"],
    "react/self-closing-comp": ["warn"],
    "react/sort-comp": ["warn"],
    "react/static-property-placement": ["off"],
    "react/style-prop-object": ["error"],
    "react/void-dom-elements-no-children": ["error"],
    "react/jsx-boolean-value": ["error"],
    "react/jsx-closing-bracket-location": [
      "warn",
      "line-aligned",
    ],
    "react/jsx-closing-tag-location": ["off"],
    "react/jsx-curly-newline": ["warn"],
    "react/jsx-curly-spacing": ["error"],
    "react/jsx-equals-spacing": ["error"],
    "react/jsx-first-prop-new-line": ["error"],
    "react/jsx-fragments": ["error"],
    "react/jsx-handler-names": ["warn"],
    "react/jsx-indent": [
      "error",
      jsxIndent,
    ],
    "react/jsx-indent-props": [
      "error",
      jsxIndent,
    ],
    "react/jsx-max-depth": [
      "warn",
      {"max": 8},
    ],
    "react/jsx-max-props-per-line": [
      "warn",
      {"when": "multiline"},
    ],
    "react/jsx-no-bind": ["warn"],
    "react/jsx-no-script-url": ["error"],
    "react/jsx-no-useless-fragment": ["warn"],
    "react/jsx-pascal-case": ["error"],
    "react/jsx-props-no-multi-spaces": ["error"],
    "react/jsx-tag-spacing": [
      "error",
      {"beforeClosing": "never"},
    ],
  },
};
