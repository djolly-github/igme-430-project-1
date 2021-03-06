const responseUtils = require('./responseUtils');
const characterUtils = require('./characterUtils');

const characters = [
  {
    name: 'Test Character',
    stats: {
      per: 6,
      wit: 5,
      wil: 4,
      end: 3,
      str: 2,
      agi: 1,
    },
    appearance: {
      species: 1,
      pattern: 2,
      outfit: 3,
      weapon: 4,
    },
  },
];

/**
 * General response writing method
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 * @param {number} status HTML status code
 * @param {string} type HTML Content-Type
 * @param {object} data data to write
 */
const respond = (request, response, status, type, data) => {
  const validatedType = responseUtils.getValidType(type);
  response.writeHead(status, { 'Content-Type': validatedType });

  if (data) {
    let toWrite = data;
    if (validatedType === 'text/xml') {
      toWrite = responseUtils.toXML(data);
    } else {
      toWrite = JSON.stringify(data);
    }

    response.write(toWrite);
  }
  response.end();
};

/**
 * Routing handler for /badRequest
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 * @param {object} params GET parameters, if any
 */
const badRequest = (request, response, params) => {
  let data;

  if (params && params.valid === 'true') {
    data = {
      message: 'the param valid was true for badRequest',
    };
    respond(request, response, 200, request.headers.accept, data);
  } else {
    data = {
      message: 'missing param valid=true for badRequest',
      id: 'BAD REQUEST',
    };
    respond(request, response, 400, request.headers.accept, data);
  }
};

/**
 * Routing handler for /forbidden
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const forbidden = (request, response) => {
  const data = {
    message: 'you do not have permission to see this',
    id: 'FORBIDDEN',
  };
  respond(request, response, 403, request.headers.accept, data);
};

/**
 * Routing handler for /internal
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const internal = (request, response) => {
  const data = {
    message: 'there was an internal server error',
    id: 'INTERNAL_SERVER_ERROR',
  };

  respond(request, response, 500, request.headers.accept, data);
};

/**
 * Routing handler for /notFound
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const notFound = (request, response) => {
  const data = {
    message: 'request not found',
    id: 'NOT_FOUND',
  };

  respond(request, response, 404, request.headers.accept, data);
};

/**
 * Routing handler for /notImplemented
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const notImplemented = (request, response) => {
  const data = {
    message: 'request not yet implemented',
    id: 'NOT_IMPLEMENTED',
  };

  respond(request, response, 501, request.headers.accept, data);
};

/**
 * Routing handler for /success
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 */
const success = (request, response) => {
  const data = {
    message: 'this is a successful response',
  };

  respond(request, response, 200, request.headers.accept, data);
};

/**
 * Routing handler for /unauthorized
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 * @param {object} params GET parameters, if any
 */
const unauthorized = (request, response, params) => {
  let data;

  if (params && params.loggedIn === 'yes') {
    data = {
      message: 'the param loggedIn was yes for unauthorized',
    };

    respond(request, response, 200, request.headers.accept, data);
  } else {
    data = {
      message: 'missing param loggedIn=yes for unauthorized',
      id: 'UNAUTHORIZED',
    };

    respond(request, response, 401, request.headers.accept, data);
  }
};

/**
 * Routing handler for /getCharacter
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 * @param {object} params GET/POST parameters, if any
 */
const getCharacter = (request, response, params) => {
  const indexOfCharacter = characterUtils.findCharacter(
    characters, { name: params.name },
  );

  if (indexOfCharacter > -1) {
    if (request.method === 'HEAD') {
      respond(request, response, 204, request.headers.accept);
    } else {
      respond(request, response, 200, request.headers.accept, characters[indexOfCharacter]);
    }
  } else {
    notFound(request, response);
  }
};

/**
 * Routing handler for /saveCharacter
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 * @param {object} params POST parameters
 */
const saveCharacter = (request, response, params) => {
  const indexOfCharacter = characterUtils.findCharacter(
    characters, { name: params.charToAdd.name },
  );

  if (indexOfCharacter > -1) {
    characters[indexOfCharacter] = params.charToAdd;
    respond(request, response, 204, request.headers.accept);
  } else {
    characters.push(params.charToAdd);
    respond(request, response, 201, request.headers.accept);
  }
};

module.exports = {
  badRequest,
  forbidden,
  getCharacter,
  internal,
  notFound,
  notImplemented,
  saveCharacter,
  success,
  unauthorized,
};
