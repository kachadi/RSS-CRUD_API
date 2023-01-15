import { ServerResponse } from 'http';
import { DEFAULT_HEADER } from './constants';

const validateArray = (value: any[]) => {
  if (value.length === 0) return true;
  return value.every((v) => typeof v === 'string');
};

const createResponse = (res: ServerResponse, code: number, responseObj: {}) => {
  res.writeHead(code, DEFAULT_HEADER);
  res.write(JSON.stringify(responseObj));
  res.end();
};

export { validateArray, createResponse };
