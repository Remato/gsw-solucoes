![gsw]('https://github.com/Remato/gsw-solucoes/blob/main/frontend/src/assets/logo.png')
  
# Teste GSW Soluções
Este projeto provê uma API Rest simples para manipular dados de usuários e controle de login. O projeto foi dividido em 2 módulos:


**Back end:** cria um servidor NodeJS contendo a API usando [Node.js](https://nodejs.org/en/) + [Express](https://expressjs.com/)

**Front end:** cria um simples cliente web para acessar o backend usando [React JS](https://reactjs.org/) com um controle de acesso por meio de login.
## Documentação
### Definição do model **User**

```ts
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

## Quickstart

1 - Abra 2 terminais, para back end e front end respectivamente.

* [Automatico]: dê permissão para os scripts:
  ```sh
  chmod +x backend.sh frontend.sh
  ```
  
  depois execute 1 em cada terminal
  ```sh
  ./backend.sh
  ```

  ```sh
  ./frontend.sh
  ```

* [Manualmente]: na raíz do projeto:
 
  **inicializando back end!**
  ```sh
  cd backend && yarn && yarn typeorm migration:run && yarn dev:server
  ```
 
  **inicializando front end!**
  ```sh
  cd frontend && yarn && yarn start
  ``` 
  
 ## Detalhes

API = http://localhost:3333/users

React app site = http://localhost:3000 


**o banco de dados postgres é inicializado com um user inicial para poder logar na aplicação, após logar é possível ter acesso ao resto da API, caso contrário o middleware irá bloquear o acesso através do JWT:**
 
 
 **1. Cadastrar novo usuário**

 **2. Listar usuários**

 **3. Atualizar usuário**

 **4. Excluir usuário**
