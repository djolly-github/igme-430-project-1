/**
 * Searches the characters array for the index of a specified character (compares the .name field)
 * @param {object} characters the characters array to search on
 * @param {object} other the character whose .name to search for
 * @returns the index of the character, or -1 if none exists
 */
const findCharacter = (characters, other) => characters.findIndex(
  (character) => character.name === other.name,
);

/**
 * Converts body params to character object
 * @param {object} bodyParams object parsed from query string
 * @returns character object
 */
const bodyToCharacterObject = (bodyParams) => ({
  name: bodyParams.name,
  stats: {
    per: bodyParams.per,
    wit: bodyParams.wit,
    wil: bodyParams.wil,
    end: bodyParams.end,
    str: bodyParams.str,
    agi: bodyParams.agi,
  },
  appearance: {
    species: bodyParams.species,
    pattern: bodyParams.pattern,
    outfit: bodyParams.outfit,
    weapon: bodyParams.weapon,
  },
});

/**
 * Ensures a stat is a number between -10 and 10
 * @param {string|number} statValue the value to validate
 * @param {number} min the min value statValue can be (inclusive)
 * @param {number} max the max value statValue can be (inclusive)
 * @returns true if valid, false if invalid
 */
const validateCharacterValue = (statValue, min, max) => {
  const num = parseInt(statValue, 10);
  return !Number.isNaN(num) && Number.isInteger(num) && num >= min && num <= max;
};

/**
 * Ensures all the values on a character exist and are valid
 * @param {object} characterToValidate The character object to validate
 * @returns true if valid, false if invalid
 */
const validateCharacter = (characterToValidate) => characterToValidate.name
  && characterToValidate.stats
  && characterToValidate.appearance
  && validateCharacterValue(characterToValidate.stats.per, -10, 10)
  && validateCharacterValue(characterToValidate.stats.wit, -10, 10)
  && validateCharacterValue(characterToValidate.stats.wil, -10, 10)
  && validateCharacterValue(characterToValidate.stats.end, -10, 10)
  && validateCharacterValue(characterToValidate.stats.str, -10, 10)
  && validateCharacterValue(characterToValidate.stats.agi, -10, 10)
  && validateCharacterValue(characterToValidate.appearance.species, 0, 4)
  && validateCharacterValue(characterToValidate.appearance.pattern, 0, 4)
  && validateCharacterValue(characterToValidate.appearance.outfit, 0, 4)
  && validateCharacterValue(characterToValidate.appearance.weapon, 0, 4);

module.exports = {
  bodyToCharacterObject,
  findCharacter,
  validateCharacter,
};
