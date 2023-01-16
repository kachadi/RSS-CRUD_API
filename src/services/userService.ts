import { IncomingMessage } from 'http';
import * as uuid from 'uuid';
import { IUser } from '../models/user';
import User from '../entities/user';
import UserRepository from '../repository/userRepository';
import {
  ERR_MSG_ID_NOT_UUID,
  ERR_MSG_INVALID_REQUEST_FIELDS,
} from '../utils/constants';
import { NOTFOUND_ERROR, VALIDATION_ERROR } from '../utils/errors';
import { validateArray } from '../utils/helpers';

export default class UserService {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async find(id: string) {
    await this.validateId(id);
    const user = await this.userRepository.find(id);

    if (!user) {
      throw new NOTFOUND_ERROR(`User with id ${id} not found`);
    } else {
      return user;
    }
  }

  async createUser(req: IncomingMessage) {
    const parsedRequestData = await this.parseRequest(req);
    const validatedRequestData = await this.validateRequest(parsedRequestData);
    const newUser = new User(validatedRequestData);
    return await this.userRepository.create(newUser);
  }

  async updateUser(req: IncomingMessage, id: string) {
    const parsedRequestData = await this.parseRequest(req);
    await this.validateId(id);
    const isUserExist = await this.userRepository.checkUser(id);
    if (!isUserExist) {
      throw new NOTFOUND_ERROR(`User with id ${id} not found`);
    }
    const updatedUser = await this.userRepository.update(id, parsedRequestData);
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.validateId(id);
    const isUserExist = await this.userRepository.checkUser(id);
    if (!isUserExist) {
      throw new NOTFOUND_ERROR(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
    return id;
  }

  async parseRequest(req: IncomingMessage) {
    let data: string[] = [];
    await req.on('data', (chunk) => {
      data.push(chunk);
    });
    try {
      return await JSON.parse(data.toString());
    } catch (error) {
      throw new VALIDATION_ERROR(ERR_MSG_INVALID_REQUEST_FIELDS);
    }
  }

  async validateId(id: string) {
    if (!uuid.validate(id)) {
      throw new VALIDATION_ERROR(ERR_MSG_ID_NOT_UUID);
    }
  }

  async validateRequest(parsedData: IUser) {
    const validationResult = await this.validateRecievedObjFields(parsedData);

    if (!validationResult) {
      throw new VALIDATION_ERROR(ERR_MSG_INVALID_REQUEST_FIELDS);
    } else {
      return parsedData;
    }
  }

  async validateRecievedObjFields(dataToValidate: IUser) {
    const userEntries = Object.entries(dataToValidate);
    let result = true;

    if (userEntries.length < 3) return false;

    userEntries.forEach((entry) => {
      const [key, value] = entry;
      if (
        (key === 'username' && typeof value !== 'string') ||
        (key === 'age' && typeof value !== 'number') ||
        (key === 'hobbies' &&
          (!(value instanceof Array) || !validateArray(value)))
      ) {
        result = false;
      }
    });
    return result;
  }
}
