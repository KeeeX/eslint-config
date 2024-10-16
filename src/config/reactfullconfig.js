/** Normalize the user configuration for react */
export const getReactFullConfig = configEntry => {
  if (typeof configEntry === "boolean") {
    if (configEntry) return {react: true, reactNative: false, reactHooks: false};
    return {react: false, reactNative: false, reactHooks: false};
  }
  return {
    react: true,
    reactNative: configEntry?.reactNative ?? false,
    reactHooks: configEntry?.reactHooks ?? false,
  };
};
