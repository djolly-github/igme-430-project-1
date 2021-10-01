const fs = require('fs');

/**
 * The file and content-type for the index page
 */
const indexPage = {
  file: fs.readFileSync(`${__dirname}/../client/client.html`),
  type: 'text/html',
};

/**
 * The file and content-type for the index stylesheet
 */
const indexStyle = {
  file: fs.readFileSync(`${__dirname}/../client/style.css`),
  type: 'text/css',
};

/**
 * Gets a text file to load
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 * @param {object} page the page to load, contains page.file and page.type
 */
const getFile = (request, response, page) => {
  response.writeHead(200, { 'Content-Type': page.type });
  response.write(page.file);
  response.end();
};

/**
 * Gets the index page
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getIndex = (request, response) => getFile(request, response, indexPage);

/**
 * Gets the index stylesheet
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getStyle = (request, response) => getFile(request, response, indexStyle);

module.exports = {
  getIndex,
  getStyle,
};
