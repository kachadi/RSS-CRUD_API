import { IncomingMessage, ServerResponse } from 'http';
import { generateInstance } from '../factories/userFactory';
import { ERR_MSG_ENDPOINT_NOT_FOUND } from '../utils/constants';
import { createResponse } from '../utils/helpers';
import { StatusCode } from '../utils/constants';

const USERS: string[] = [];
const userService = generateInstance(USERS);
const API_URL = '/api/users/';

const routes = async (req: IncomingMessage, res: ServerResponse) => {
  const [api, users, id, ...rest] = req.url!.split('/').filter(Boolean);
  const key = `/${api}/${users}/${id || ''}:${req.method}`;

  if (rest.length > 0) {
    createResponse(res, 404, { message: ERR_MSG_ENDPOINT_NOT_FOUND });
  }

  let result;

  switch (key) {
    case `${API_URL}:GET`:
      result = await userService.findAll();
      createResponse(res, StatusCode.OK, { result: result });
      break;

    case `${API_URL}:POST`:
      result = await userService.createUser(req);
      createResponse(res, StatusCode.CREATED, {
        message: 'User successfully created.',
        result: result,
      });
      break;

    case `${API_URL}${id}:GET`:
      result = await userService.find(id);
      createResponse(res, StatusCode.OK, { result: result });
      break;

    case `${API_URL}${id}:PUT`:
      result = await userService.updateUser(req, id);
      createResponse(res, StatusCode.OK, { result: result });
      break;

    case `${API_URL}${id}:DELETE`:
      result = await userService.deleteUser(id);
      createResponse(res, StatusCode.NO_CONTENT, {});
      break;

    default:
      createResponse(res, StatusCode.NOT_FOUND, { message: ERR_MSG_ENDPOINT_NOT_FOUND });
      break;
  }
};

export { routes };
