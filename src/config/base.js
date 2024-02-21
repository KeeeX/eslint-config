const {
  indentDepth,
  maxBlockDepth,
  maxNestedCallbacks,
  maxStatements,
} = require("./common.js");

module.exports = {
  dependencies: ["eslint"],
  extendsBase: ["eslint:recommended"],
  rules: {
    "no-console": ["warn"],
    "no-dupe-else-if": ["error"],
    "no-empty": ["warn", {"allowEmptyCatch": true}],
    "no-extra-parens": ["warn", "functions"],
    "no-import-assign": ["error"],
    "no-setter-return": ["error"],
    "no-sparse-arrays": ["warn"],
    "no-template-curly-in-string": ["warn"],
    "no-unsafe-negation": ["warn"],
    "require-atomic-updates": ["warn"],
    "valid-typeof": ["warn", {"requireStringLiterals": false}],
    "nonblock-statement-body-position": ["warn"],
    "accessor-pairs": ["error"],
    "array-callback-return": ["error"],
    "class-methods-use-this": ["warn", {exceptMethods: ["render"]}],
    "complexity": ["warn"],
    "curly": ["warn", "multi-line"],
    "default-param-last": ["error"],
    "dot-location": ["warn", "property"],
    "eqeqeq": ["error", "smart"],
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "guard-for-in": ["warn"],
    "max-classes-per-file": ["warn", 1],
    "no-alert": ["error"],
    "no-caller": ["error"],
    "no-constructor-return": ["error"],
    "no-div-regex": ["error"],
    "no-else-return": ["error"],
    "no-empty-function": ["warn", {"allow": ["arrowFunctions"]}],
    "no-eq-null": ["error"],
    "no-eval": ["error"],
    "no-extend-native": ["error"],
    "no-extra-bind": ["warn"],
    "no-fallthrough": ["error", {"commentPattern": "fallthrough"}],
    "no-floating-decimal": ["error"],
    "no-implicit-coercion": ["warn"],
    "no-implied-eval": ["error"],
    "no-invalid-this": ["error"],
    "no-iterator": ["error"],
    "no-labels": ["error"],
    "no-lone-blocks": ["warn"],
    "no-loop-func": ["error"],
    "no-magic-numbers": [
      "error",
      {
        "ignore": [0, 1, -1],
        "ignoreArrayIndexes": true,
        "ignoreDefaultValues": true,
        "ignoreClassFieldInitialValues": true,
      },
    ],
    "no-multi-spaces": ["error"],
    "no-multi-str": ["error"],
    "no-new-func": ["error"],
    "no-new-wrappers": ["error"],
    "no-octal-escape": ["error"],
    "no-param-reassign": ["warn"],
    "no-proto": ["error"],
    "no-return-assign": ["error"],
    "no-return-await": ["error"],
    "no-script-url": ["error"],
    "no-self-compare": ["error"],
    "no-throw-literal": ["error"],
    "no-unmodified-loop-condition": ["warn"],
    "no-unused-expressions": [
      "error",
      {
        "allowShortCircuit": true,
        "allowTernary": true,
      },
    ],
    "no-useless-call": ["error"],
    "no-useless-catch": ["error"],
    "no-useless-concat": ["error"],
    "no-useless-escape": ["error"],
    "no-useless-return": ["error"],
    "no-void": ["error"],
    "no-warning-comments": ["warn"],
    "prefer-named-capture-group": ["warn"],
    "prefer-promise-reject-errors": ["warn", {"allowEmptyReject": true}],
    "prefer-regex-literals": ["error"],
    "radix": ["warn"],
    "require-await": ["warn"],
    "require-unicode-regexp": ["warn"],
    "wrap-iife": ["error", "outside"],
    "strict": ["error", "never"],
    "no-shadow": ["error", {"builtinGlobals": true}],
    "no-undef-init": ["error"],
    "no-unused-vars": ["warn", {"argsIgnorePattern": "^_.*"}],
    "no-use-before-define": ["error"],
    "callback-return": ["warn"],
    "global-require": ["warn"],
    "handle-callback-err": ["warn"],
    "no-buffer-constructor": ["error"],
    "no-mixed-requires": ["warn"],
    "no-new-require": ["error"],
    "no-process-env": ["warn"],
    "no-process-exit": ["error"],
    "array-bracket-newline": ["error", "consistent"],
    "array-bracket-spacing": ["error"],
    "array-element-newline": ["error", "consistent"],
    "block-spacing": ["error", "never"],
    "brace-style": ["error"],
    "camelcase": ["error"],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error"],
    "comma-style": ["error"],
    "computed-property-spacing": ["error"],
    "eol-last": ["error"],
    "func-call-spacing": ["error"],
    "func-name-matching": ["warn"],
    "func-names": ["error", "as-needed"],
    "func-style": ["error"],
    "function-call-argument-newline": ["warn", "consistent"],
    "function-paren-newline": ["warn", "multiline-arguments"],
    "id-length": [
      "warn",
      {
        "min": 1,
        "max": 32,
      },
    ],
    "implicit-arrow-linebreak": ["error"],
    "indent": [
      "error",
      indentDepth,
      {
        "FunctionDeclaration": {"parameters": "first"},
        "FunctionExpression": {"parameters": "first"},
        "CallExpression": {"arguments": "first"},
        "ArrayExpression": "first",
        "ignoreComments": true,
      },
    ],
    "jsx-quotes": ["error"],
    "key-spacing": ["error"],
    "keyword-spacing": ["error"],
    "linebreak-style": ["error"],
    "lines-between-class-members": [
      "error",
      "always",
      {exceptAfterSingleLine: true},
    ],
    "max-depth": ["warn", maxBlockDepth],
    "max-len": [
      "warn",
      {
        "code": 100,
        "ignoreComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
      },
    ],
    "max-lines": [
      "warn",
      {
        "max": 1000,
        "skipBlankLines": true,
      },
    ],
    "max-lines-per-function": [
      "warn",
      {
        "skipBlankLines": true,
        "skipComments": true,
        "IIFEs": true,
      },
    ],
    "max-nested-callbacks": ["warn", maxNestedCallbacks],
    "max-statements": ["warn", maxStatements],
    "max-statements-per-line": ["warn"],
    "new-parens": ["error"],
    "newline-per-chained-call": ["error"],
    "no-array-constructor": ["warn"],
    "no-lonely-if": ["warn"],
    "no-mixed-operators": ["warn"],
    "no-multi-assign": ["error"],
    "no-multiple-empty-lines": ["error", {max: 1, maxBOF: 0, maxEOF: 0}],
    "no-negated-condition": ["warn"],
    "no-nested-ternary": ["error"],
    "no-new-object": ["error"],
    "no-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unneeded-ternary": ["warn"],
    "no-whitespace-before-property": ["error"],
    "object-curly-newline": [
      "error",
      {"multiline": true},
    ],
    "object-curly-spacing": ["error"],
    "object-property-newline": ["error", {allowAllPropertiesOnSameLine: true}],
    "operator-assignment": ["warn"],
    "operator-linebreak": ["error", "before"],
    "padded-blocks": ["error", "never"],
    "prefer-exponentiation-operator": ["error"],
    "prefer-object-spread": ["error"],
    "quote-props": ["error", "consistent"],
    "quotes": ["error"],
    "semi": ["error"],
    "semi-spacing": ["error"],
    "semi-style": ["error"],
    "space-before-blocks": ["error"],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always",
      },
    ],
    "space-in-parens": ["error"],
    "space-infix-ops": ["error"],
    "space-unary-ops": [
      "error",
      {
        "words": true,
        "nonwords": false,
      },
    ],
    "spaced-comment": ["error"],
    "switch-colon-spacing": ["error"],
    "template-tag-spacing": ["error"],
    "unicode-bom": ["error"],
    "arrow-body-style": ["error"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": ["error"],
    "generator-star-spacing": ["error", "after"],
    "no-duplicate-imports": ["error"],
    "no-useless-computed-key": ["error"],
    "no-useless-constructor": ["warn"],
    "no-useless-rename": ["error"],
    "no-var": ["error"],
    "object-shorthand": ["error"],
    "prefer-arrow-callback": ["warn"],
    "prefer-const": ["warn"],
    "prefer-numeric-literals": ["error"],
    "prefer-rest-params": ["warn"],
    "prefer-spread": ["error"],
    "prefer-template": ["error"],
    "rest-spread-spacing": ["error"],
    "symbol-description": ["warn"],
    "template-curly-spacing": ["error"],
    "yield-star-spacing": ["error"],
  },
};
