/** Normalize the user configuration for react */
export const getReactFullConfig = configEntry => {
  if (typeof configEntry === "boolean") {
    if (configEntry) return {react: true, reactHooks: false, reactNative: false};
    return {react: false, reactHooks: false, reactNative: false};
  }
  const cfg = {
    react: configEntry?.react ?? false,
    reactHooks: configEntry?.reactHooks ?? false,
    reactNative: configEntry?.reactNative ?? false,
  };
  if (!cfg.react && (cfg.reactHooks || cfg.reactNative)) {
    throw new Error("Invalid react config; react must be enabled for react-native and react-hooks to be enabled too.");
  }
  return cfg;
};
