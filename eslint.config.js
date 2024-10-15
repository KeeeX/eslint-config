import eslintConfig from "./src/index.js";

export default await eslintConfig({
  ignores: ["src_old"],
  globals: [{globals: {node: true}}],
});
