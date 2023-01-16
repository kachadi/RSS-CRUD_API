import supertest, { Test } from 'supertest';
import { server } from '../src';
import {
  ERR_MSG_ENDPOINT_NOT_FOUND,
  ERR_MSG_ID_NOT_UUID,
  ERR_MSG_INVALID_REQUEST_FIELDS,
} from '../src/utils/constants';

const apiAddress = `/api/users/`;

const testUser: any = {
  username: 'John',
  age: 34,
  hobbies: ['sport', 'music'],
};

const testUser2: any = {
  username: 'Ann',
  age: 18,
  hobbies: ['dance'],
};

describe('CRUD API test', () => {
  describe('1st scenario. Check all availible methods and routes', () => {
    const scenario1TestUser = testUser;

    it('it should return empty array of users', async () => {
      const expectedResult: [] = [];

      const response = await supertest(server).get(apiAddress);

      expect(response.body).toEqual({ result: expectedResult });
      expect(response.status).toBe(200);
    });

    it('it should create user and return user into body', async () => {
      const response = await supertest(server)
        .post(apiAddress)
        .send(JSON.stringify(testUser));

      expect(response.body.message).toEqual('User successfully created.');
      expect(response.body.result.username).toEqual(testUser.username);
      expect(response.status).toBe(201);
      scenario1TestUser.id = response.body.result.id;
    });

    it('it should get user by id and return user into body', async () => {
      const id = scenario1TestUser.id;

      const response = await supertest(server).get(`${apiAddress}/${id}/`);

      expect(response.body).toEqual({ result: scenario1TestUser });
      expect(response.status).toBe(200);
    });

    it('it should update user by id and return updated user into body', async () => {
      const id = scenario1TestUser.id;
      const updatedUser = Object.assign(scenario1TestUser, testUser2);

      const response = await supertest(server)
        .put(`${apiAddress}/${id}/`)
        .send(JSON.stringify(testUser2));

      expect(response.body).toEqual({ result: updatedUser });
      expect(response.status).toBe(200);
    });

    it('it should delete user by id and return 204 status code', async () => {
      const id = scenario1TestUser.id;

      const response = await supertest(server).delete(`${apiAddress}/${id}/`);

      expect(response.status).toBe(204);
    });

    it('it should try get previously deleted user by id and return not found message', async () => {
      const id = scenario1TestUser.id;

      const response = await supertest(server).get(`${apiAddress}/${id}/`);

      expect(response.status).toBe(404);
    });

    server.close();
  });

  describe('2nd scenario. Check if error handling working correctly', () => {
    it('it should return 404 status code when server try get on not supported endpoint', async () => {
      const response = await supertest(server).get('/api/products');

      expect(response.body.message).toEqual(ERR_MSG_ENDPOINT_NOT_FOUND);
      expect(response.status).toBe(404);
    });

    it('it should return 404 status code when server try use unsupported method ', async () => {
      const response = await supertest(server).patch(apiAddress);

      expect(response.body.message).toEqual(ERR_MSG_ENDPOINT_NOT_FOUND);
      expect(response.status).toBe(404);
    });

    it('it should return 404 status code when server try use unsupported method ', async () => {
      const response = await supertest(server).patch(apiAddress);

      expect(response.body.message).toEqual(ERR_MSG_ENDPOINT_NOT_FOUND);
      expect(response.status).toBe(404);
    });

    it('it should return 400 status code when user JSON parsed with error', async () => {
      const brokenJSON = `{
        "username": "John";
        "age": "16";
        "hobbies": "[read]"
      }`;

      const response = await supertest(server)
        .post(apiAddress)
        .send(brokenJSON);

      expect(response.body.error).toEqual(ERR_MSG_INVALID_REQUEST_FIELDS);
      expect(response.status).toBe(400);
    });

    it('it should return 400 status code when user JSON has not required fields', async () => {
      const uncorrectUser = `{
        "username": "John",
        "hobbies": "[read]"
      }`;

      const response = await supertest(server)
        .post(apiAddress)
        .send(uncorrectUser);

      expect(response.body.error).toEqual(ERR_MSG_INVALID_REQUEST_FIELDS);
      expect(response.status).toBe(400);
    });

    it('it should return 400 status code when user JSON fields does not match the required types', async () => {
      const uncorrectUser = `{
        "username": "John",
        "age": "16",
        "hobbies": "read"
      }`;

      const response = await supertest(server)
        .post(apiAddress)
        .send(uncorrectUser);

      expect(response.body.error).toEqual(ERR_MSG_INVALID_REQUEST_FIELDS);
      expect(response.status).toBe(400);
    });

    it('it should return 400 status code when user JSON fields does not match the required types', async () => {
      const uncorrectUser = `{
        "username": "John",
        "age": "16",
        "hobbies": "read"
      }`;

      const response = await supertest(server)
        .post(apiAddress)
        .send(uncorrectUser);

      expect(response.body.error).toEqual(ERR_MSG_INVALID_REQUEST_FIELDS);
      expect(response.status).toBe(400);
    });

    server.close();
  });

  describe('3rd scenario. Check if user id  compliant  with the given format', () => {
    it('it should try to get not existing user with uuid format id and return the appropriate error ', async () => {
      const correctUUID = '04bbe805-5516-4972-a5c8-1272382f307f';

      const response = await supertest(server).get(
        `${apiAddress}/${correctUUID}/`
      );

      expect(response.body.error).toEqual(
        `User with id ${correctUUID} not found`
      );
      expect(response.status).toBe(404);
    });

    it('it should try to get user with not uuid format id and return the appropriate error ', async () => {
      const incorrectUUID = '04bbe805-5516-4972-a5c8-1272382f30';

      const response = await supertest(server).get(
        `${apiAddress}/${incorrectUUID}/`
      );

      expect(response.body.error).toEqual(ERR_MSG_ID_NOT_UUID);
      expect(response.status).toBe(400);
    });

    server.close();
  });
});
