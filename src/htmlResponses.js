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
 * The file and content-type for the main index script
 */
const indexJSMain = {
  file: fs.readFileSync(`${__dirname}/../client/client.js`),
  type: 'application/javascript',
};

/**
 * The file and content-type for the definitions index script
 */
const indexJSDefine = {
  file: fs.readFileSync(`${__dirname}/../client/client_define.js`),
  type: 'application/javascript',
};

/**
 * The file and content-type for the utility index script
 */
const indexJSUtil = {
  file: fs.readFileSync(`${__dirname}/../client/client_util.js`),
  type: 'application/javascript',
};

/**
 * The file and content-type for the setup index script
 */
const indexJSSetup = {
  file: fs.readFileSync(`${__dirname}/../client/client_setup.js`),
  type: 'application/javascript',
};

/**
 * The file and content-type for the tippy initialization index script
 */
const indexJSTippy = {
  file: fs.readFileSync(`${__dirname}/../client/client_tippy.js`),
  type: 'application/javascript',
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

/**
 * Gets the main index script
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getIndexJSMain = (request, response) => getFile(request, response, indexJSMain);

/**
 * Gets the definitions index script
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getIndexJSDefine = (request, response) => getFile(request, response, indexJSDefine);

/**
 * Gets the utility index script
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getIndexJSUtil = (request, response) => getFile(request, response, indexJSUtil);

/**
 * Gets the setup index script
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getIndexJSSetup = (request, response) => getFile(request, response, indexJSSetup);

/**
 * Gets the tippy initialization index script
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getIndexJSTippy = (request, response) => getFile(request, response, indexJSTippy);

module.exports = {
  getIndex,
  getIndexJSDefine,
  getIndexJSMain,
  getIndexJSSetup,
  getIndexJSTippy,
  getIndexJSUtil,
  getStyle,
};
