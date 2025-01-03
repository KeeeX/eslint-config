/** Normalize the user configuration for react */
export const getReactFullConfig = (configEntry) => {
  if (typeof configEntry === "boolean") {
    if (configEntry) {
      return {
        newJsxRuntime: false,
        react: true,
        reactHooks: false,
        reactNative: false,
      };
    }
    return {newJsxRuntime: false, react: false, reactHooks: false, reactNative: false};
  }
  const cfg = {
    newJsxRuntime: configEntry?.newJsxRuntime ?? false,
    react: true,
    reactHooks: configEntry?.reactHooks ?? false,
    reactNative: configEntry?.reactNative ?? false,
  };
  return cfg;
};
