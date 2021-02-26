import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  oldpassword: string;
  password: string;
}

class UpdateUserService {
  public async execute({
    name,
    email,
    oldpassword,
    password,
  }: Request): Promise<boolean> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (user) {
      const passwordMatched = await compare(oldpassword, user.password);

      if (passwordMatched) {
        const hashedPassword = await hash(password, 8);

        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        await usersRepository.save(user);

        return true;
      }
    }

    return false;
  }
}

export default UpdateUserService;
