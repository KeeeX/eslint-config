/** Enable the depcheck env-variable, before importing the eslint config */
export const setDepCheck = () => {
  process.env.KEEEX_DEPCHECK = "true";
};

/** Check the depcheck flag */
export const isDepCheck = () => process.env.KEEEX_DEPCHECK === "true";

/** Enable deeper checks */
export const isFullCheck = () =>
  process.env.KXESLINT === "full" || process.env.GIT_HOOK_NAME === "pre-push";
