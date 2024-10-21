# Common eslint configuration for KeeeX

## Installation
The package is available on npmjs and can be installed with any package manager that supports it.

```bash
npm install -D @keeex/eslint-config
```

## Usage
To prepare the configuration file, you can run `npx kxeslint-setup` to create a blank config file.
Alternatively, you can create the file yourself.
In both cases, it will be named `eslint.config.js`.

Here is all the available options with their default values:

```JavaScript
import eslintConfig from "@keeex/eslint-config";

export default await eslintConfig({
  globals: [
    {globals: {builtin: true, es2025: true}},
    {
      files: ["**/*.cjs"],
      globals: {commonjs: true},
    },
    {
      files: ["src/webapp/**/*"],
      globals: {browser: true, serviceworker: true},
    },
    {
      files: ["src/bin/**/*", "src/server/**/*"],
      globals: {node: true},
    },
    {
      files: ["*.cjs"],
      globals: {nodeCjs: true},
    },
    {
      files: ["src/tests/**/*", "src/**/*.test.*"],
      globals: {mocha: true},
    },
  ],
  ignores: ["lib", "web", "gen", "src/gen"],
  import: 3,
  mocha: true,
  noBase: false,
  react: {react: false, reactHooks: false, reactNative: false},
  typescript: true,
});
```

If any of the top-level property is not defined, it will be set to its default value.
If you want to customize the output, instead of directly exporting the return value of the function
you can edit it by hand.
Good luck with that.

## Configuration

### `globals`
The `globals` property is an array of object to define which globals are available in the code.
Each of these objects can have two properties: `files`, which is an array of globs to match the files to
be considered, and `globals`, which is an object that can have the following properties:

- "builtin": generic JS built-in globals
- "browser": globals available in the browser
- "commonjs": globals available in CommonJS scripts
- "es2025": globals available in ES2025 scripts
- "mocha": globals available in Mocha tests
- "node": globals available in Node.js
- "nodeCjs": globals for Node.js in commonjs
- "serviceworker": globals available in Service Workers
- "worker": globals available in Workers
- "custom": an object of custom identifiers to be made available, whose keys are the identifiers and
  the values are boolean indicating if these identifiers are read-only (false) or not (true)

### `ignores`
Array of globs to globally ignore for eslint.

### `import`
Some extra rules for formatting and ordering imports can be used by setting
`import` to true (enabled by default with a depth of 3).
It is possible to pass a number instead of a boolean to limit the depth of circular imports check.
This greatly improves performances, at the risk of missing a dependency cycle.

### `mocha`
To enable mocha-specific rules, as well as loosen some regular rules for
testing, set `mocha` to true.

### `noBase`
The base configuration imports all eslint recommendeds rules and promises handling rules.
Setting `noBase` to true removes that.
There is absolutely no reason to do so.

### `react`
To improve handling of React/JSX, set `react` to true.
You can also pass an object with the following boolean properties:

- `react`: enable/disable react rules
- `reactHooks`: enable/disable React hooks rules
- `reactNative`: enable/disable React Native rules

You can't enable the hooks or React Native rules without enabling React.

### `typescript`
Set to `true` (the default value) to enable all TypeScript rules.
This includes tsdoc rules.

## Dependencies
This configuration depends on various packages to be available depending on the user settings for
each individual projects.
You can list the required dependencies for the current configuration by running
`npx kxeslint-setup`.
You can also automatically install missing dependencies by adding the "auto" flag to the command.

All dependencies are set as peer dependencies, as they are almost all optional depending on local
settings.

The tool will also uninstall older dependencies that we used to have but are not used anymore.

## Migration from .eslintrc.cjs
When running `npx kxeslint-setup`, the tool will automatically detect an existing `.eslintrc.cjs`
file and provides instructions for the migration.
The migration process is manual; you have to update the new `eslint.config.js` file by hand.

## Debugging config issues
Running `npx eslint --inspect-config` will launch a debugger interface that allows checking all the
rules and individual file rules.
