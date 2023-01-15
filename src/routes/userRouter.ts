import { IncomingMessage, ServerResponse } from 'http';
import { generateInstance } from '../factories/userFactory';
import { ERR_MSG_ENDPOINT_NOT_FOUND } from '../utils/constants';
import { createResponse } from '../utils/helpers';

const USERS: string[] = [];
const userService = generateInstance(USERS);

const routes = async (req: IncomingMessage, res: ServerResponse) => {
  const [api, users, id, ...rest] = req.url!.split('/').filter(Boolean);
  const key = `/${api}/${users}/${id || ''}:${req.method}`;

  if (rest.length > 0) {
    createResponse(res, 404, { message: ERR_MSG_ENDPOINT_NOT_FOUND });
  }

  let result;

  switch (key) {
    case '/api/users/:GET':
      result = await userService.findAll();
      createResponse(res, 200, { result: result });
      break;

    case '/api/users/:POST':
      const newUserId = await userService.createUser(req);
      createResponse(res, 201, {
        message: 'User successfully created.',
        id: newUserId,
      });
      break;

    case `/api/users/${id}:GET`:
      result = await userService.find(id);
      createResponse(res, 200, { result: result });
      break;

    case `/api/users/${id}:PUT`:
      result = await userService.updateUser(req, id);
      createResponse(res, 200, { result: result });
      break;

    case `/api/users/${id}:DELETE`:
      result = await userService.deleteUser(id);
      createResponse(res, 204, {});
      break;

    default:
      createResponse(res, 404, { message: ERR_MSG_ENDPOINT_NOT_FOUND });
      break;
  }
};

export { routes };
