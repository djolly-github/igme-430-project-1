const fs = require('fs');

/**
 * Collection of images available to the server
 */
const images = {
  ahool: {
    file: fs.readFileSync(`${__dirname}/../client/ahool.png`),
    type: 'image/png',
  },
  chupacabra: {
    file: fs.readFileSync(`${__dirname}/../client/chupacabra.png`),
    type: 'image/png',
  },
  client: {
    file: fs.readFileSync(`${__dirname}/../client/client.png`),
    type: 'image/png',
  },
  jersey: {
    file: fs.readFileSync(`${__dirname}/../client/jersey_devil.png`),
    type: 'image/png',
  },
  weremoth: {
    file: fs.readFileSync(`${__dirname}/../client/weremoth.png`),
    type: 'image/png',
  },
  werewolf: {
    file: fs.readFileSync(`${__dirname}/../client/werewolf.png`),
    type: 'image/png',
  },
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
const getAhool = (request, response) => getFile(request, response, images.ahool);

/**
 * Gets the index page
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getChupacabra = (request, response) => getFile(request, response, images.chupacabra);

/**
 * Gets the index page
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getClient = (request, response) => getFile(request, response, images.client);

/**
 * Gets the index page
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getJersey = (request, response) => getFile(request, response, images.jersey);

/**
 * Gets the index page
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getWeremoth = (request, response) => getFile(request, response, images.weremoth);

/**
 * Gets the index page
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const getWerewolf = (request, response) => getFile(request, response, images.werewolf);

module.exports = {
  getAhool,
  getChupacabra,
  getClient,
  getJersey,
  getWeremoth,
  getWerewolf,
};
