import UserRepository from '../repository/userRepository';
import UserService from '../services/userService';

const generateInstance = (data: string[]) => {
  const userRepository = new UserRepository(data);
  const userService = new UserService(userRepository);
  return userService;
};

export { generateInstance };
