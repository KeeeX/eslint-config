module.exports = {
  plugins: (presetSettings, allOptions, dependencies) => {
    if (typeof allOptions.typescript !== "string") return undefined;
    if (dependencies) dependencies.add("eslint-plugin-deprecation");
    return ["deprecation"];
  },
  rules: {},
};
