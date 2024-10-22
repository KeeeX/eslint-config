import {isFullCheck} from "./environ.js";

/** List of ignored patterns by default */
export const ignores = ["lib", "web", "gen", "src/gen"];

/** Default globals affected to all projects */
export const globals = [
  {
    globals: {
      builtin: true,
      es2025: true,
    },
  },
  {
    files: ["**/*.cjs"],
    globals: {commonjs: true},
  },
  {
    files: ["src/webapp/**/*"],
    globals: {
      browser: true,
      serviceworker: true,
    },
  },
  {
    files: ["src/bin/**/*", "src/server/**/*", "*"],
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
];

/** Import cycle max depth */
export const cycleMaxDepth = isFullCheck() ? true : 0;
