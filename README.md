Common eslint configuration
===========================

Installation
------------

```bash
npm install -D @keeex/eslint-config
```

Usage
-----
Create an eslint configuration file at the root of your project named
`.eslintrc.js` containing the following:

```JavaScript
const eslintConfig = require("@keeex/eslint-config");
module.exports = eslintConfig(
  {
    base: true,
    promise: true,
    jsx: true,
    import: true,
    reacthooks: true,
    reactnative: true,
    typescript: "./tsconfig.json",
    mocha: true,
  },
  {
    env: {
      es6: true,
      node: true,
    },
  },
);
```

The first argument is the configurations to pull-in. `base` is the generic
JavaScript options, `jsx` add rules for React and JSX, `reacthook` add rules for
React hooks and `typescript` add rules for TypeScript.
For TypeScript, you can specify the name of your TypeScript configuration file,
in which case more rules will be enabled.

The second argument is the base eslint configuration, to specify extra options
that are not defined by the default configuration. It can be empty if not
needed.

The default configuration is:

```JavaScript
module.exports = {
  parser: "@typescript-eslint/parser", // only when typescript is enabled
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json", // only for typescript
  },
  overrides: [
    {
      files: ["webres/**/*.js", "webres/**/*.ts"],
      env: {
        browser: true,
      },
    },
  ],
  extends: [ /\* enabled rule bases \*/ ],
  rules: { /\* enabled rules \*/ },
}
```

When specifying a base configuration, top-level properties will override these
defaults, and automatic rules will in turn inject themselves in top-level.
This mean that if you specify an `overrides` top-level property in the second
argument of eslintConfig(), the default `overrides` value will not be used, but
if a later rule (for typescript for example) have to populate `overrides` it
will extend whatever the current value is.

It is also appropriate to append any local-only changes to the ouptut of the
configuration function.

### Promises
Some extra rules for promises can be used by setting `promise` to true (enabled
by default).

### Imports
Some extra rules for formatting and ordering imports can be used by setting
`import` to true (enabled by default).
It is possible to pass an object with the following properties instead of `true`:

```JavaScript
{
  detectImportCycle: true,
}
```

All properties are `true` by default.
Import cycle can be either `false` to disable it, `true` to enable it with a default depth of 3, or
any number to control the maximum depth of the scan.

### TypeScript
If `typescript` is set to true, only basic typescript rules are enforced.
Instead, it is advised to provide the path to the typescript configuration file
(typically `tsconfig.json`), in which case rules that requires typing
informations are enabled.

### React/JSX
To improve handling of React/JSX, set `jsx` to true.
It is also possible to pass a string indicating the expected React version.
If not specified, will set to "detect" and use the version installed in the
project.

### React Hooks
To enable some more rules for React Hooks, set `reacthooks` to true,

### React Native
To enable some more rules for React Native, set `reactnative` to true.

### Mocha testsuite
To enable mocha-specific rules, as well as loosen some regular rules for
testing, set `mocha` to true.
Fine-tuned control is possible by providing an object instead of true with
the following properties:

```JavaScript
{
  fileFilter: [
    "**/*.test.ts",
    "**/*.test.js",
    "**/testutils.ts",
    "**/testutils.js",
    "tests/**/*.ts",
    "tests/**/*.js",
    "test/**/*.ts",
    "test/**/*.js",
  ],
  expectHelper: true,
}
```

All value optional, default values are the ones specified above.
`fileFilter` is the overrides files definition to apply the test settings to.
`expectHelper` relax some `eslint` rules to handle the use of expect-like
assertions in test files.

Dependencies
------------

Depend on `eslint`.
If typescript is enabled, `@typescript-eslint/eslint-plugin`,
`@typescript-eslint/parser` must be installed.
If React/JSX is enabled, `eslint-plugin-react` must be installed.
If React Hooks is enabled, `eslint-plugin-react-hooks` must be installed.
If React Native is enabled, `eslint-plugin-react-native` must be installed.
Promise support requires `eslint-plugin-promise`.
If mocha is used as the testsuite, `eslint-plugin-mocha` must be installed.
Import support requires `eslint-plugin-import`.
