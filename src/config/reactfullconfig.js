/** Normalize the user configuration for react */
export const getReactFullConfig = configEntry => {
  if (typeof configEntry === "boolean") {
    if (configEntry) return {react: true, reactHooks: false, reactNative: false};
    return {react: false, reactHooks: false, reactNative: false};
  }
  return {
    react: true,
    reactHooks: configEntry?.reactHooks ?? false,
    reactNative: configEntry?.reactNative ?? false,
  };
};
