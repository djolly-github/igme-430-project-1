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

/**
 * General response writing method
 * @param {object} request XHR request object
 * @param {object} response XHR response object
 * @param {number} status HTML status code
 * @param {string} type HTML Content-Type
 * @param {object} data data to write
 */
const respond = (request, response, status, type, data) => {
  const validatedType = getValidType(type);
  response.writeHead(status, { 'Content-Type': validatedType });

  let toWrite = data;
  if (validatedType === 'text/xml') {
    toWrite = toXML(data);
  } else {
    toWrite = JSON.stringify(data);
  }

  response.write(toWrite);
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

module.exports = {
  badRequest,
  forbidden,
  internal,
  notFound,
  notImplemented,
  success,
  unauthorized,
};
