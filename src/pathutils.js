const asArray = (value) => {
  if (Array.isArray(value)) return value;
  return [value];
};

export const getExtensions = (fileTypes) => {
  const result = [];
  const esm = fileTypes.esm ?? true;
  const cjs = fileTypes.cjs ?? false;
  if (fileTypes.javascript) {
    if (esm) result.push(".js", ".mjs");
    if (cjs) result.push(".cjs");
  }
  if (fileTypes.typescript) {
    if (esm) result.push(".ts", ".mts");
    if (cjs) result.push(".mts");
  }
  if (fileTypes.jsx) {
    if (esm) result.push(".jsx");
    if (fileTypes.typescript) result.push(".tsx");
  }
  return result;
};

/** Configuration to build a filter list */
// interface FilesDefinition {
//   /** Directories where the files are; no recursion */
//   exactDirectories?: Array<string>;
//   /** Directories where the files are, will go into subdirectories */
//   recursiveDirectories?: Array<string>;
//   /**
//    * File name pattern. Must have `".ext"` to be substituted by the extension.
//    *
//    * Defaults to `["*.ext"]`.
//    */
//   filesPatterns?: Array<string>;
//   fileTypes: {
//     /** Enable base JavaScript extensions */
//     javascript: boolean;
//     /** Enable base TypeScript extension */
//     typescript: boolean;
//     /** Enable JSX extensions */
//     jsx: boolean;
//     /** Support ESM */
//     esm: boolean;
//     /** Support CommonJS */
//     commonjs: boolean;
//   };
// }

const extPlaceholder = ".ext";

export const getFiles = (definitions) => {
  const result = new Set();
  for (const definition of asArray(definitions)) {
    const extensions = getExtensions(definition.fileTypes);
    const directories = new Set();
    if (definition.exactDirectories) directories.add(...asArray(definition.exactDirectories));
    if (definition.recursiveDirectories) {
      directories.add(...asArray(definition.recursiveDirectories).map((c) => `${c}/**`));
    }
    const filePatterns = new Set(asArray(definition.filePatterns) ?? [`*${extPlaceholder}`]);
    for (const directory of directories) {
      for (const filePattern of filePatterns) {
        if (filePattern.includes(extPlaceholder)) {
          for (const extension of extensions) {
            result.add(`${directory}/${filePattern.replace(extPlaceholder, extension)}`);
          }
        } else {
          result.add(`${directory}/${filePattern}`);
        }
      }
    }
  }
  return Array.from(result);
};
