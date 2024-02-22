# DinDin API
  API de gerenciamento de despesas.

## ⚙️ Instalação e Configuração 
#### Siga os seguintes passos:
1. Abra o terminal e clone este repositório para sua máquina com o seguinte comando:
```bash
git clone https://github.com/Lectio-Project/Backend-DinDin.git
```

2. Navegue até a pasta do projeto com o comando:
```bash
cd Backend-DinDin
```

3. Abra o projeto no seu VsCode (Se não tiver instalado, instale-o [aqui!](https://code.visualstudio.com/download)):
```bash
code .
```

4. Renomei o arquivo **.env.example** para **.env** ou crie um arquivo **.env** na raiz do projeto
- Crie e/ou preencha no arquivo **.env** a variável de ambiente **DATABASE_URL** com o link para o seu banco de dados MongoDB
- No arquivo **.env** crie e/ou preencha o **JWT_SECRET_KEY** com a sua chave JWT secreta
 
7. Verifique se você possui o Node.js instalado em sua máquina, caso não instale-o,  [Baixe o Node.js aqui!](https://nodejs.org)

8. Instale as dependências do projeto com o comando:
```bash
npm install
```

9. Rode o seguinte comando para inicializar o servidor:
```bash
npm run start
```

10. Para traduzir seu schema do Prisma ORM em código TypeScript que você pode usar em seu aplicativo para interagir com o banco de dados de forma segura e tipada rode o comando abaixo:
```bash
npx prisma generate
```

11. Para aplicar todas as alterações necessárias para garantir que o esquema do banco de dados corresponda ao seu esquema definido no arquivo rode o seguinte comando:
```bash
npx prisma db push
```

## 📡 Rotas
### Usuário
- Cadastro de usuário:
```ts
routes.post("/sign-up");
```

- Login de usuário:
```ts
routes.post("/login");
```

- Atualização de usuário:
```js
routes.put("/user/:id");
```

## 🆕 Funcionalidades
- Usuários:
1. Cadastrar usuário
2. Login de usuário
3. Atualização de usuário
4. Autenticação e Autorização

## 🔧 Tecnologias
- Nest
- Express
- TypeScript
- Zod
- Prisma ORM
- MongoDB
  
## 🚀 Deploy
- Link da API em produção:
```text
Em Breve
```

&copy; MIT License 2024, feito com ❤️ por [Alisson Romão](https://github.com/alissonromaosantos), [Vanessa Ribeiro](https://github.com/vanessaribeiro03) e [Rochel Rodrigues](https://github.com/Rochelrrc).