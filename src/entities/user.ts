import { randomUUID } from 'crypto';
import { IUser } from '../models/user';

export default class User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];

  constructor(userObj: IUser) {
    this.id = randomUUID();
    this.username = userObj.username;
    this.age = userObj.age;
    this.hobbies = userObj.hobbies;
  }
}
