![oowlish](https://rendaextraton.com.br/wp-content/uploads/2020/04/Da-stone-para-o-autonomo.jpg)

# Restaurante Padre Cícero
Este projeto provê uma API Rest simples para manipular dados de produtos e vendas de um restaurante. O projeto foi dividido em 2 módulos:


**Back end:** cria um servidor NodeJS contendo a API Rest usando [Node.js](https://nodejs.org/en/) + [Typegoose/Mongoose](https://github.com/typegoose/typegoose)

**Front end:** cria um simples cliente web para acessar o backend usando [React JS](https://reactjs.org/)

## Documentação
### Definição de models

```ts
export class ProductClass {
  @prop()
  public id!: string;

  @prop()
  public name!: string;

  @prop()
  public value!: number;
}
```
**ProductClass: é a classe que irá gerar um model utilizando o typegoose para acessar os produtos**

```ts
export class SaleClass {
  @prop()
  public id!: string;

  @prop({ ref: () => ProductClass })
  public products?: Ref<ProductClass>[];

  @prop({ required: true, default: Date.now() })
  private createdAt!: Date;
}
```
**SaleClass: é a classe que irá gerar um model utilizando o typegoose para acessar as vendas**

```ts
export class UserClass {
  @prop()
  public id!: string;

  @prop()
  public name!: string;

  @prop({ unique: true })
  public email!: string;

  @prop()
  public password!: string;
}
```

**UserClass: é a classe que irá gerar um model utilizando o typegoose para acessar os usuários, porém essa rota foi criada apenas para criar um usuário administrativo para poder acessar a página web**

## Quickstart

1 - Abra 2 terminais, para backend e frontend respectivamente.

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
  ```sh
  cd backend && yarn && yarn dev:server
  ```
  **inicializa back end!**

  ```sh
  cd frontend && yarn && yarn start
  ``` 
  **inicializa front end!**


 ## Detalhes

http://localhost:3333
API Rest 

http://localhost:3000 
React app site

**o banco de dados mongoDB foi previamente povoado, porém no site pode-se:**
 
 **1. listar produtos/vendas**

 **2. excluir produtos**

 **3. cadastrar novo produto**

 **4. fazer uma nova venda.**
