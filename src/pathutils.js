const asArray = (value) => {
  if (Array.isArray(value)) return value;
  return [value];
};

const envShorthands = {
  library: {
    mocha: "src/tests/**",
  },
  mobile: {
    mobile: "src/**",
  },
  node: {
    node: ["", "src/**"],
    mocha: "src/tests/**",
  },
  webapp: {
    webapp: ["src/**", "webres/*/js/**"],
  },
  webservice: {
    mocha: "src/tests/**",
    node: ["", "bin/**", "src/bin/**", "src/server/**"],
    webapp: ["src/webapp/**", "webres/*/js/**"],
  },
};

const getEffectiveEnv = (configEnv) => {
  if (typeof configEnv !== "string") return configEnv;
  return envShorthands[configEnv];
};

/**
 * @param {Array<string>|string} environments - List of environments to pull
 * @param {Array<string>|string} configEnv - List of configured environments
 */
export const getEnvDirectories = (environments, configEnv, defaultDir) => {
  const effectiveEnv = getEffectiveEnv(configEnv);
  const dirs = [];
  for (const env of asArray(environments)) {
    if (env in effectiveEnv) dirs.push(...asArray(effectiveEnv[env]));
  }
  if (dirs.length === 0 && defaultDir) return [defaultDir];
  return dirs;
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
    if (cjs) result.push(".cts");
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
//     cjs: boolean;
//   };
// }

const extPlaceholder = ".ext";

export const getFiles = (definitions) => {
  const result = new Set();
  for (const definition of asArray(definitions)) {
    const extensions = getExtensions(definition.fileTypes);
    const directories = new Set();
    if (definition.exactDirectories !== undefined) {
      directories.add(...asArray(definition.exactDirectories));
    }
    if (definition.recursiveDirectories !== undefined) {
      directories.add(
        ...asArray(definition.recursiveDirectories).map((c) => (c === "" ? "**" : `${c}/**`)),
      );
    }
    const filePatterns = new Set(
      definition.filePatterns ? asArray(definition.filePatterns) : [`*${extPlaceholder}`],
    );
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

/** Get a list of file glob depending on config and requested file types */
export const getFilesEnv = (eslintConfig, environments, filePatterns, fileTypes, defaultDir) => {
  const effectiveFileTypes = fileTypes
    ? {...fileTypes}
    : {
        cjs: true,
        esm: true,
        javascript: true,
        typescript: Boolean(eslintConfig.typescript),
      };
  return getFiles({
    exactDirectories: getEnvDirectories(environments, eslintConfig.environments, defaultDir),
    filePatterns,
    fileTypes: effectiveFileTypes,
  });
};
