<h1 align="center">
    Workshop
</h1>
<p align="center">💻 Sistema de gestão de arquivos por tipo de usuário e criação de assinatura.</p>


<p align="center">
 <a href="#objetivo">Objetivo</a> •
 <a href="#roadmap">Roadmap</a> • 
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#contribuicao">Contribuição</a> • 
 <a href="#licenc-a">Licença</a> • 
 <a href="#autor">Autor</a>
</p>


<h4 align="center"> 
	🚧  Workshop 🚀 Em construção...  🚧
</h4>

## 💻 Sobre o projeto
💻 Workshop - é um sistema pensado e criado para a empresa [Volmaq](volmaq.com.br) para cadastrar manuais e catálogos a fim da facilitar o acesso dos mesmos por seus colaboradores.


## Features

- [x] Departamento;
  - [x] Cadastrar;
  - [x] Listar;
  - [x] Editar
- [x] Usuário;
  - [x] Cadastrar;
  - [x] Listar;
  - [x] Editar
- [x] Produtos;
  - [x] Cadastrar;
  - [x] Listar;
  - [x] Editar
- [x] Modelos;
  - [x] Cadastrar;
  - [x] Listar;
  - [x] Editar
- [x] Cadastro de arquivo  ;
- [x] Vincular arquivo com produto e modelo;
- [x] Listar arquivo de acordo com o tipo e perfil de usuário: mecânico, consultor ou administrador;
- [x] Gerar assinatura para email;
- [x] Visualizador de PDF sem opção de download.



## 🚀 Como executar o projeto

Este projeto é divido em três partes:
1. Backend (pasta server) 
2. Frontend (pasta frontend)

💡 O Frontend necessita que o Backend esteja sendo executado para funcionar.
É possível testar em modo de produção apenas com o backend executando, basta navegar para: 

```bash

http://localhost:3000/login 

```

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/gabrielsants/workshop.git

# Acesse a pasta do projeto no terminal/cmd
$ cd workshop

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3000

```

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone https://github.com/gabrielsants/workshop.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd whorkshop

# Vá para a pasta da aplicação Front End
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento e live reload
$ ng serve -o

# A aplicação será aberta na porta:4200 - acesse http://localhost:4200

```

#### ♟ Database

Este projeto utiliza MYSQL mas também pode ser executado com MARIADB.
Os scripts e o modelo estão na pasta `database`.

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([Angular 11](https://angular.io/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Angular Material](https://material.angular.io/)**
-   **[Bootstrap](https://getbootstrap.com/)**
-   **[NgxRocket](https://github.com/ngx-rocket/generator-ngx-rocket)**
-   **[ng2-pdf-viewer](https://github.com/VadimDez/ng2-pdf-viewer)**

> Veja o arquivo  [package.json](https://github.com/gabrielsants/workshop/blob/main/frontend/package.json)

#### **Server**  ([NestJS](https://nestjs.com/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Passport](https://docs.nestjs.com/security/authentication#implementing-passport-strategies)**
-   **[TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)**
-   **[MySQL](https://www.mysql.com/)**
-   **[dotENV](https://github.com/motdotla/dotenv)**

> Veja o arquivo  [package.json](https://github.com/gabrielsants/workshop/blob/main/frontend/package.json)
---

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---


## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Gabriel Santos 👋🏽 [Entre em contato!](https://www.linkedin.com/in/dev-gabriel-santos/)
