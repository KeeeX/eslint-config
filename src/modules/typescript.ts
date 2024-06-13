// #region Imports
import {Linter} from "eslint";
import tseslint from "typescript-eslint";
import tsdoc from "eslint-plugin-tsdoc";
import * as common from "./common.js";
import {ConfigWithDefault} from "../config.js";
// #endregion

// #region Config
const get = (config: ConfigWithDefault): Array<Linter.FlatConfig> | null => {
  if (!config.typescript) return null;
  const res: Array<Linter.FlatConfig> = [
    ...(tseslint.configs.recommendedTypeChecked as Array<Linter.FlatConfig>),
    {
      name: "keeex-eslint-typescript",
      files: common.tsFileFilters,
      rules: {
        "@typescript-eslint/array-type": [
          "error",
          { "default": "generic", "readonly": "generic", },
        ],
        "brace-style": "off",
        "@typescript-eslint/brace-style": ["error"],
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": ["error"],
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          { "assertionStyle": "as", "objectLiteralTypeAssertions": "never", },
        ],
        "@typescript-eslint/consistent-type-definitions": [ "error", "interface", ],
        "default-param-last": "off",
        "@typescript-eslint/default-param-last": ["error"],
        "@typescript-eslint/explicit-member-accessibility": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": ["error"],
        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": ["error"],
        "indent": "off",
        "@typescript-eslint/indent": [
          "error",
          common.indentDepth,
          {
            "FunctionDeclaration": {"parameters": "first"},
            "FunctionExpression": {"parameters": "first"},
            "CallExpression": {"arguments": "first"},
            "ArrayExpression": "first",
            "ignoreComments": true,
          },
        ],
        "@typescript-eslint/member-delimiter-style": ["warn"],
        "@typescript-eslint/member-ordering": [
          "warn",
          {
            "default": [
              // Index signature
              "signature",

              // Fields
              "public-static-field",
              "protected-static-field",
              "private-static-field",
              "#private-static-field",

              "public-decorated-field",
              "protected-decorated-field",
              "private-decorated-field",

              "public-instance-field",
              "protected-instance-field",
              "private-instance-field",
              "#private-instance-field",

              "public-abstract-field",
              "protected-abstract-field",

              "public-field",
              "protected-field",
              "private-field",
              "#private-field",

              "static-field",
              "instance-field",
              "abstract-field",

              "decorated-field",

              "field",

              // Constructors
              "static-initialization",
              "public-constructor",
              "protected-constructor",
              "private-constructor",

              "constructor",

              // Getters/Setters
              ["public-static-get", "public-static-set"],
              ["protected-static-get", "protected-static-set"],
              ["private-static-get", "private-static-set"],
              ["#private-static-get", "#private-static-set"],

              ["public-decorated-get", "public-decorated-set"],
              ["protected-decorated-get", "protected-decorated-set"],
              ["private-decorated-get", "private-decorated-set"],

              ["public-instance-get", "public-instance-set"],
              ["protected-instance-get", "protected-instance-set"],
              ["private-instance-get", "private-instance-set"],
              ["#private-instance-get", "#private-instance-set"],

              ["public-abstract-get", "public-abstract-set"],
              ["protected-abstract-get", "protected-abstract-set"],

              ["public-get", "public-set"],
              ["protected-get", "protected-set"],
              ["private-get", "private-set"],
              ["#private-get", "#private-set"],

              ["static-get", "static-set"],
              ["instance-get", "instance-set"],
              ["abstract-get", "abstract-set"],

              ["decorated-get", "decorated-set"],

              ["get", "set"],

              // Methods
              "public-static-method",
              "protected-static-method",
              "private-static-method",
              "#private-static-method",

              "public-decorated-method",
              "protected-decorated-method",
              "private-decorated-method",

              "public-instance-method",
              "protected-instance-method",
              "private-instance-method",
              "#private-instance-method",

              "public-abstract-method",
              "protected-abstract-method",

              "public-method",
              "protected-method",
              "private-method",
              "#private-method",

              "static-method",
              "instance-method",
              "abstract-method",

              "decorated-method",

              "method",
            ],
          },
        ],
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": ["warn"],
        "@typescript-eslint/no-dupe-class-members": ["error"],
        "@typescript-eslint/no-dynamic-delete": ["error"],
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": [
          "warn",
          {
            "allow": [
              "arrowFunctions",
              "protected-constructors",
              "private-constructors",
            ],
          },
        ],
        "@typescript-eslint/no-empty-interface": [
          "warn",
          {"allowSingleExtends": true},
        ],
        "@typescript-eslint/no-explicit-any": ["error"],
        "@typescript-eslint/no-extra-non-null-assertion": ["error"],
        "no-extra-parens": "off",
        "@typescript-eslint/no-extra-parens": [
          "warn",
          "functions",
        ],
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": ["error"],
        "@typescript-eslint/no-extraneous-class": ["error"],
        "no-magic-numbers": "off",
        "@typescript-eslint/no-magic-numbers": [
          "error",
          {
            "ignore": [
              0,
              1,
              -1,
            ],
            "ignoreDefaultValues": true,
            "ignoreArrayIndexes": true,
            "ignoreClassFieldInitialValues": true,
          },
        ],
        "no-shadow": "off",
        "no-invalid-this": "off",
        "@typescript-eslint/no-shadow": ["warn"],
        "@typescript-eslint/no-non-null-asserted-optional-chain": ["error"],
        "@typescript-eslint/parameter-properties": ["error"],
        "@typescript-eslint/no-require-imports": ["error"],
        "@typescript-eslint/no-this-alias": ["error"],
        "@typescript-eslint/no-type-alias": [
          "error",
          {
            "allowAliases": "always",
            "allowCallbacks": "always",
            "allowMappedTypes": "always",
            "allowGenerics": "always",
            "allowConditionalTypes": "always",
          },
        ],
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["error"],
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": [
          "error",
          {
            "allowShortCircuit": true,
            "allowTernary": true,
          },
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {"varsIgnorePattern": "^_.*"},
        ],
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": ["warn"],
        "@typescript-eslint/prefer-as-const": ["error"],
        "@typescript-eslint/prefer-for-of": ["error"],
        "@typescript-eslint/prefer-optional-chain": ["warn"],
        "quotes": "off",
        "@typescript-eslint/quotes": ["error"],
        "semi": "off",
        "@typescript-eslint/semi": ["error"],
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": [
          "error",
          {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always",
          },
        ],
        "@typescript-eslint/unified-signatures": ["error"],
        "@typescript-eslint/naming-convention": ["warn"],
        "@typescript-eslint/no-floating-promises": ["error"],
        "no-implied-eval": "off",
        "@typescript-eslint/no-implied-eval": ["error"],
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": ["error"],
        "@typescript-eslint/no-unnecessary-condition": ["error"],
        "@typescript-eslint/no-unnecessary-qualifier": ["error"],
        "@typescript-eslint/no-unnecessary-type-arguments": ["warn"],
        "@typescript-eslint/prefer-nullish-coalescing": ["warn"],
        "@typescript-eslint/restrict-plus-operands": ["error"],
        "@typescript-eslint/switch-exhaustiveness-check": ["warn"],
        "require-await": "off",
        "@typescript-eslint/require-await": ["warn"],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/unbound-method": [
          "error",
          {ignoreStatic: true},
        ],
      },
    },
  ];
  if (config.tsdoc) {
    res.push({
      name: "keeex-eslint-typescript-tsdoc",
      files: common.tsFileFilters,
      plugins: {"tsdoc": tsdoc},
      rules: {"tsdoc/syntax": "warn"},
    });
  }
  return res;
};

export default get;
// #endregion
