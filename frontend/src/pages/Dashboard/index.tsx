import React, { useRef, useState, useEffect, useCallback } from 'react';

import api from '../../services/api';
import headerImg from '../../assets/headerr.svg';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';

import { FiMail, FiLock, FiUser, FiTrash2 } from 'react-icons/fi'; 
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { 
  Container, 
  Header, 
  Divider,
  Content, 
  UsersList,  
} from './styles';

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserFormData {
  name: string;
  email: string;
  oldpassword: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const createRef = useRef<FormHandles>(null);
  const updateRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => { 
    api.get('/users').then((response) => {
      setUsers(response.data);
    });
  }, [users]);

  const handleCreateUser = useCallback(async(data: CreateUserFormData) => {
    try{
      createRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', {
        name: data.name, 
        email: data.email,
        password: data.password,
      });

      addToast({
        type: 'success', 
        title: 'Sucesso!',
        description: 'Usuário criado com sucesso!',
      });

    }catch(err){
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        createRef.current?.setErrors(errors);

        addToast({
          type: 'error', 
          title: 'Error!',
          description: 'Usuário não pôde ser criado',
        });

        return;
      }

    }

  }, [addToast]);

  const handleUpdateUser = useCallback(async(data: UpdateUserFormData) => {
    updateRef.current?.setErrors({});
  
    await api.put(`/users/`, {
      name: data.name, 
      email: data.email,
      oldpassword: data.oldpassword,
      password: data.password,
    }).then(() => {
      addToast({
        type: 'success', 
        title: 'Sucesso!',
        description: 'Usuário atualizado com sucesso!',
      });
    })

  }, [addToast]);

  const handleDeleteUser = useCallback(async(id: string) => {

    await api.delete(`/users/${id}`);
    
  }, []);

  return(
    <Container>

      <Header>
        <img src={headerImg} alt="gsw_solucoes" />
        <h1>Consumo da API</h1>
      </Header>
      
      <Content>
        <Form ref={createRef} onSubmit={handleCreateUser}>  
          
          <h2>Cadastre um novo usuário</h2>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input 
          name="password" 
          type="password" 
          icon={FiLock} 
          placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Form ref={updateRef} onSubmit={handleUpdateUser}>  
          
          <h2>Atualize um usuário</h2>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input 
          name="password" 
          type="password" icon={FiLock} 
          placeholder="Senha" />

          <Input name="oldpassword" 
          type="password" 
          icon={FiLock} 
          placeholder="Nova Senha" />

          <Button type="submit">Atualizar</Button>
        </Form>
        
        <Divider />

        <UsersList>
          {users.length === 0 ? 
          <h2>Não existem usuários ainda.</h2> : 
          <h2>Lista de usuários</h2>}
          
          {users.map((user) => (
            <>
             
              <h3>
              <FiTrash2 
                onClick={() => handleDeleteUser(user.id)} 
                color="#d9534f" size={20} />
                {' '} ID do usuário: {user.id}
              </h3>
              

              <strong>Nome:</strong>
              <h4>{user.name}</h4>
              <strong>E-mail:</strong>
              <h4>{user.email}</h4>
              <strong>Criado em:</strong>
              <h4>{user.created_at}</h4>
              <strong>Atualizado em:</strong>
              <h4>{user.updated_at}</h4>
              <Divider />
            </>
          ))}
          
        </UsersList>
        
      </Content>
      
    </Container>
  );
}

export default Dashboard;
