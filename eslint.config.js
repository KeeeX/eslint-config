import eslintConfig from "./src/index.js";

export default await eslintConfig({
  globals: [{globals: {node: true}}],
  ignores: ["src_old"],
  typescript: false,
});
