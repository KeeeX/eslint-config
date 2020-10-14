const {indentDepth} = require("./common");
const {
  extendsBase: extendsBaseType,
  rules: rulesType,
} = require("./typescript_types");

/**
 * Check if types-based rules can be used
 */
const useTypes = presetOptions => typeof presetOptions === "string";

const rulesBase = {
  "@typescript-eslint/array-type": [
    "error",
    {
      "default": "generic",
      "readonly": "generic",
    },
  ],
  "brace-style": "off",
  "@typescript-eslint/brace-style": ["error"],
  "@typescript-eslint/naming-convention": ["error"],
  "comma-spacing": "off",
  "@typescript-eslint/comma-spacing": ["error"],
  "@typescript-eslint/consistent-type-assertions": [
    "error",
    {
      "assertionStyle": "as",
      "objectLiteralTypeAssertions": "never",
    },
  ],
  "@typescript-eslint/consistent-type-definitions": [
    "error",
    "interface",
  ],
  "default-param-last": "off",
  "@typescript-eslint/default-param-last": ["error"],
  "@typescript-eslint/explicit-member-accessibility": ["error"],
  "@typescript-eslint/explicit-module-boundary-types": ["error"],
  "func-call-spacing": "off",
  "@typescript-eslint/func-call-spacing": ["error"],
  "indent": "off",
  "@typescript-eslint/indent": [
    "error",
    indentDepth,
  ],
  "@typescript-eslint/member-ordering": ["warn"],
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
    },
  ],
  "no-shadow": "off",
  "@typescript-eslint/no-shadow": ["warn"],
  "@typescript-eslint/no-non-null-asserted-optional-chain": ["error"],
  "@typescript-eslint/no-parameter-properties": ["error"],
  "@typescript-eslint/no-require-imports": ["error"],
  "@typescript-eslint/no-this-alias": ["error"],
  "@typescript-eslint/no-type-alias": [
    "error",
    {
      "allowAliases": "always",
      "allowCallbacks": "always",
      "allowMappedTypes": "always",
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
    "never",
  ],
  "@typescript-eslint/unified-signatures": ["error"],
};


module.exports = {
  overrides: [
    {
      files: [
        "*.ts",
        "*.tsx",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: presetOptions => {
        const projectFile = typeof presetOptions === "string"
          ? presetOptions
          : null;
        if (projectFile) {
          return {project: projectFile};
        }
        return null;
      },
      extendsBase: presetOptions => {
        const typescriptBase = [
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
        ];
        if (useTypes(presetOptions)) {
          return [
            ...typescriptBase,
            ...extendsBaseType,
          ];
        }
        return typescriptBase;
      },
      rules: presetOptions => {
        if (useTypes(presetOptions)) {
          return {
            ...rulesBase,
            ...rulesType,
          };
        }
        return rulesBase;
      },
    },
  ],
};

