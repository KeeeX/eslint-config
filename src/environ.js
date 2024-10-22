/** Enable the depcheck env-variable, before importing the eslint config */
export const setDepCheck = () => {
  process.env.KEEEX_DEPCHECK = "true";
};

/** Check the depcheck flag */
export const isDepCheck = () => process.env.KEEEX_DEPCHECK === "true";

/** Enable the full check */
export const setFullCheck = () => {
  process.env.KXESLINT = "full";
};

/** Check deeper checks flag */
export const isFullCheck = () =>
  process.env.KXESLINT === "full" || process.env.GIT_HOOK_NAME === "pre-push";
