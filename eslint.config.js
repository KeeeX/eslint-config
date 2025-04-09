import eslintConfig from "./src/index.js";

export default await eslintConfig({
  environments: "node",
  globals: [{globals: {node: true}}],
  mocha: false,
  typescript: false,
});
