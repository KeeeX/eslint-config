import eslintConfig from "./src/index.js";

export default await eslintConfig({
  environments: "node",
  globals: [{globals: {node: true}}],
  ignores: ["src_old"],
  mocha: false,
  typescript: false,
});
