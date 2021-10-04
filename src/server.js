const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');
const imgHandler = require('./imageResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/**
 * collection of URLs to route, grouped by XHR request.method, with generic/default notFound at root
 */
const processableURLCollection = {
  GET: {
    '/': htmlHandler.getIndex,
    '/client.js': htmlHandler.getIndexJSMain,
    '/style.css': htmlHandler.getStyle,
    '/ahool.png': imgHandler.getAhool,
    '/chupacabra.png': imgHandler.getChupacabra,
    '/client.png': imgHandler.getClient,
    '/jersey_devil.png': imgHandler.getJersey,
    '/weremoth.png': imgHandler.getWeremoth,
    '/werewolf.png': imgHandler.getWerewolf,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
  },
  notFound: jsonHandler.notFound,
};

/**
 * server requestListener
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (processableURLCollection[request.method][parsedUrl.pathname]) {
    processableURLCollection[request.method][parsedUrl.pathname](request, response, params);
  } else {
    processableURLCollection.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
