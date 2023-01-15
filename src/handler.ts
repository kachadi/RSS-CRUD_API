import { ERR_MSG_INTERNAL_SERVER } from './utils/constants';
import { routes } from './routes/userRouter';
import { IncomingMessage, ServerResponse } from 'http';
import { NOTFOUND_ERROR, VALIDATION_ERROR } from './utils/errors';
import { createResponse } from './utils/helpers';

const handlerError = (res: ServerResponse) => {
  return (error: Error) => {
    if (error instanceof VALIDATION_ERROR) {
      createResponse(res, 400, { error: error.message });
    } else if (error instanceof NOTFOUND_ERROR) {
      createResponse(res, 404, { error: error.message });
    } else {
      createResponse(res, 500, { error: error.message });
      // createResponse(res, 500, {
      //   error: ERR_MSG_INTERNAL_SERVER,
      // });
    }
  };
};

const handler = (req: IncomingMessage, res: ServerResponse) => {
  return Promise.resolve(routes(req, res)).catch(handlerError(res));
};

export default handler;
