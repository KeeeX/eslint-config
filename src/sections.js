/**
 * Get a config section by name.
 *
 * When requesting a section that doesn't exist, it is added.
 *
 * @param configResult - The currently built eslint config object
 * @param name {string} - The name of the section to get
 *
 * @returns
 * The requested section, as a new entry if needed.
 */
export const getNamedSection = (configResult, name) => {
  for (const section of configResult) if (section.name === name) return section;
  const newSection = {name};
  configResult.push(newSection);
  return newSection;
};
/**
 * Add a property in an object on the provided section.
 *
 * This basically sets `configSection[optionGroup][optionName] = value`.
 * It also takes care of creating/deleting new/empty objects.
 *
 * @param configSection - A single "section" (an entry) from the eslint config array
 * @param optionGroup {string} - The name of the properties in the section to add a property to
 * @param optionName {string} - The name of the property to add
 * @param value - The value to add. If undefined, the property is removed.
 */
export const sectionAddOption = (configSection, optionGroup, optionName, value) => {
  if (!(optionGroup in configSection)) configSection[optionGroup] = {};
  if (value === undefined) {
    if (optionName in configSection[optionGroup]) {
      delete configSection[optionGroup][optionName];
      if (Object.keys(configSection[optionGroup]).length === 0) delete configSection[optionGroup];
    }
  } else {
    configSection[optionGroup][optionName] = value;
  }
};
/** Merge/create the rules property */
export const configureRules = (configSection, prefix, rules) => {
  let prefixed = {};
  if (prefix) {
    for (const [name, value] of Object.entries(rules)) prefixed[`${prefix}/${name}`] = value;
  } else {
    prefixed = rules;
  }
  configSection.rules = {...configSection.rules, ...prefixed};
};
/** Remove the `_kxconfig` property from all sections and return a suitable object. */
export const clearConfig = (configResult) => {
  const emptySectionsId = [];
  for (let i = 0; i < configResult.length; i++) {
    // We go backwards to avoid messing up the indices on deletion
    if (Object.keys(configResult[i]).length === 0) emptySectionsId.unshift(i);
  }
  for (const sectionId of emptySectionsId) configResult.splice(sectionId, 1);
};
