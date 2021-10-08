/**
 * Converts JSON to XML
 * @param {object} obj the JSON object to convert
 * @returns XML-formatted string
 */
const toXML = (obj) => {
  let toReturn = '<response>';
  Object.keys(obj).forEach((key) => {
    toReturn += `<${key}>${obj[key]}</${key}>`;
  });
  return `${toReturn}</response>`;
};

/**
 * Gets valid return Content-Types for this server application
 * @param {string} typeToCheck the Content-Type to check
 * @returns typeToCheck if valid, or 'application/json'
 */
const getValidType = (typeToCheck) => {
  if (typeToCheck === 'application/json' || typeToCheck === 'text/xml') {
    return typeToCheck;
  }

  return 'application/json';
};

module.exports = {
  getValidType,
  toXML,
};
