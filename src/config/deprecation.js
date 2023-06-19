module.exports = {
  plugins: (presetSettings, allOptions) => {
    if (typeof allOptions.typescript !== "string") return undefined;
    return ["deprecation"];
  },
  rules: {},
};
