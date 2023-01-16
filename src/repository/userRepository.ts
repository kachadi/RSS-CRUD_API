import { IUser } from '../models/user';

export default class UserRepository {
  arr: string[];
  static arr: any;
  constructor(arr: string[]) {
    this.arr = arr;
  }

  async findAll() {
    return this.arr;
  }

  async create(data: any) {
    this.arr.push(data);
    return data;
  }

  async find(id: string): Promise<any> {
    return this.arr.find((item: any) => item.id === id);
  }

  async update(id: string, newDataObj: any) {
    const sourceObj = await this.find(id);

    for (const key in sourceObj) {
      if (newDataObj[key]) {
        sourceObj[key] = newDataObj[key];
      }
    }

    return sourceObj;
  }

  async delete(searchedId: string) {
    let indexOfSearchedObj: number | undefined = undefined;
    this.arr.findIndex((el: any, i) => {
      if (el.id === searchedId) {
        indexOfSearchedObj = i;
        return true;
      }
    });

    this.arr.splice(indexOfSearchedObj!, 1);
  }

  async checkUser(id: string) {
    return this.arr.find((item: any) => item.id === id);
  }
}
