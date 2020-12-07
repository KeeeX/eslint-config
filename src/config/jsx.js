/* @licence
Copyright 2020 KeeeX SAS

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
    "react/no-unused-prop-types": ["warn"],
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
      "warn",
      {"beforeClosing": "never"},
    ],
  },
};
