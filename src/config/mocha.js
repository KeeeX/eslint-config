import mochaPlugin from "eslint-plugin-mocha";

export const apply = (configResult, eslintConfig) => {
  if (!eslintConfig.mocha) return;
  const mochaFilter = ["src/tests/**/*", "**/*.test.*"];
  configResult.push({
    ...mochaPlugin.configs.flat.recommended,
    files: mochaFilter,
  });
};
