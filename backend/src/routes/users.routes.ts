import { Router } from 'express';

// --- CRUD --- //
import CreateUserService from '../services/CreateUserService';
import ReadUsersService from '../services/ReadUsersService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // @ts-expect-error warning do TS, não sei a melhor forma da comunidade contornar
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// --- AUTH MIDDLEWARE --- //
usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (request, response) => {
  const readUsers = new ReadUsersService();

  const users = await readUsers.execute();

  users.forEach(user => {
    // @ts-expect-error warning do TS, não sei a melhor forma da comunidade contornar
    // eslint-disable-next-line no-param-reassign
    delete user.password;
  });

  return response.json(users);
});

usersRouter.put('/', async (request, response) => {
  const { name, email, oldpassword, password } = request.body;

  const updateUser = new UpdateUserService();

  const updatedUser = await updateUser.execute({
    name,
    email,
    oldpassword,
    password,
  });

  if (updatedUser) {
    return response.json({ message: 'Usuário atualizado com sucesso.' });
  }

  return response
    .status(400)
    .json({ message: 'Usuário não pôde ser atualizado.' });
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteUser = new DeleteUserService();

  const deletedUser = await deleteUser.execute({ id });

  if (deletedUser) {
    return response.json({ message: 'Usuário deletado com sucesso.' });
  }

  return response
    .status(400)
    .json({ message: 'Usuário não pode ser deletado.' });
});

export default usersRouter;
