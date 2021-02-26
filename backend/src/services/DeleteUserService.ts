import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: Request): Promise<boolean> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({ where: { id } });

    if (userExists) {
      await usersRepository.remove(userExists);
    }

    return !!userExists;
  }
}

export default DeleteUserService;
