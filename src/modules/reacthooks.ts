// #region Imports
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
// #endregion

// #region Config
const get = (config: ConfigWithDe
// #endregion

module.exports = {
  dependencies: ["eslint-plugin-react-hooks"],
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
