const DEFAULT_HEADER = { 'Content-Type': 'application/json' };
const ERR_MSG_INTERNAL_SERVER =
  'Internal server error. Please, check input data';
const ERR_MSG_ENDPOINT_NOT_FOUND = 'This endpoint or method are not supported.';
const ERR_MSG_ID_NOT_UUID = 'User id does not match with uuid format.';
const ERR_MSG_INVALID_REQUEST_FIELDS =
  'Request body does not contain required fields.';

export const enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

export {
  DEFAULT_HEADER,
  ERR_MSG_INTERNAL_SERVER,
  ERR_MSG_ENDPOINT_NOT_FOUND,
  ERR_MSG_ID_NOT_UUID,
  ERR_MSG_INVALID_REQUEST_FIELDS,
};
