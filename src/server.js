const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');
const imgHandler = require('./imageResponses');
const characterUtils = require('./characterUtils');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/**
 * collection of URLs to route, grouped by XHR request.method, with generic/default notFound at root
 */
const processableURLCollection = {
  GET: {
    // client
    '/': htmlHandler.getIndex,
    '/client.js': htmlHandler.getIndexJSMain,
    '/client_define.js': htmlHandler.getIndexJSDefine,
    '/client_util.js': htmlHandler.getIndexJSUtil,
    '/client_setup.js': htmlHandler.getIndexJSSetup,
    '/client_tippy.js': htmlHandler.getIndexJSTippy,
    '/style.css': htmlHandler.getStyle,
    '/getCharacter': jsonHandler.getCharacter,

    // images
    '/ahool.png': imgHandler.getAhool,
    '/chupacabra.png': imgHandler.getChupacabra,
    '/client.png': imgHandler.getClient,
    '/jersey_devil.png': imgHandler.getJersey,
    '/weremoth.png': imgHandler.getWeremoth,
    '/werewolf.png': imgHandler.getWerewolf,

    // test paths
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
  },
  HEAD: {
    '/getCharacter': jsonHandler.getCharacter,
  },
  POST: {
    '/saveCharacter': jsonHandler.saveCharacter,
  },
  notFound: jsonHandler.notFound,
};

const onPost = (request, response, parsedUrl, params) => {
  if (parsedUrl.pathname === '/saveCharacter') {
    let modified = params;
    const body = [];

    // log error if any and end response with 400 status
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    // push data on data stream
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // handle data on end of data stream
    request.on('end', () => {
      // get the body string
      const bodyString = Buffer.concat(body).toString();
      // parse the string to params
      const bodyParams = query.parse(bodyString);

      // create the character object
      const charToAdd = characterUtils.bodyToCharacterObject(bodyParams);

      // append userToAdd to params
      modified = {
        ...modified,
        charToAdd,
      };

      if (characterUtils.validateCharacter(charToAdd)) {
        // return Bad Request code
        processableURLCollection.GET['/badRequest'](request, response, modified);
      } else {
        // perform POST request
        processableURLCollection.POST[parsedUrl.pathname](request, response, modified);
      }
    });
  }
};

/**
 * server requestListener
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (request.method === 'POST') {
    onPost(request, response, parsedUrl, params);
  } else if (processableURLCollection[request.method][parsedUrl.pathname]) {
    processableURLCollection[request.method][parsedUrl.pathname](request, response, params);
  } else {
    processableURLCollection.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
