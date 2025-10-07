🐾 Sistema de Adoção - API REST com Node.js

API RESTful desenvolvida para gerenciar o processo de adoção de animais, desde o cadastro dos pets até o gerenciamento dos pedidos de adoção por tutores.

👥 Integrantes do Grupo YSL

Nome Completo
[Joaquim Franco]
[Miguel Carriscar]
[Murilo Reis]

🚀 Tecnologias Utilizadas

Este projeto foi construído sobre o ecossistema Node.js, utilizando as seguintes tecnologias obrigatórias:
Tecnologia	Descrição
Node.js	Ambiente de execução JavaScript.
Express.js	Framework web para construir a API.
Sequelize	ORM (Object-Relational Mapper) para manipulação do banco de dados.
SQLite	Banco de dados relacional para desenvolvimento local.
encryptjs	Biblioteca obrigatória para criptografia de senhas.

⚙️ Configuração e Instalação

Pré-requisitos

    Node.js (versão 18+)

    npm ou yarn

1. Clonar o Repositório

Bash

git clone https://github.com/mrOlliveira/APIadocaoAnimal
cd sistema-adocao-api

2. Instalar Dependências

Bash

npm install 
# ou
yarn install


3. Executar o Servidor

Bash

npm start
# ou
npm run dev # Se você tiver um script de desenvolvimento

A API estará rodando em http://localhost:[PORTA_CONFIGURADA].

🧭 Rotas da API (Endpoints)

Todas as rotas retornam respostas em formato JSON.

1. Animais (Público)

Método	Endpoint	Descrição	Proteção
POST	/animais	Cadastra um novo animal para adoção.	Nenhuma
GET	/animais	Lista animais disponíveis. Suporta filtros (espécie, porte, castrado, etc.).	Nenhuma
GET	/animais/:id	Busca um animal específico por ID. Retorna detalhes e lista de pedidos.	Admin

2. Tutores e Questionário (Público/Usuário)

Método	Endpoint	Descrição	Proteção
POST	/tutor	Cadastra um novo tutor.	Nenhuma
POST	/questionario	Cadastra o questionário obrigatório do tutor.	Auth (Usuário)
GET	/tutores/:id	Detalha os dados e questionário de um tutor.	Auth (Usuário/Admin)
PATCH	/tutores/:id	Atualiza dados do tutor e/ou completa o questionário.	Auth (Usuário)

3. Adoções (Usuário)

Método	Endpoint	Descrição	Proteção
POST	/adocoes	Cria um novo pedido de adoção (requer questionário preenchido).	Auth (Usuário)

4. Autenticação

Método	Endpoint	Descrição	Proteção
POST	/autenticacao	Login (valida e-mail e senha).	Nenhuma

5. Doações

Método	Endpoint	Descrição	Proteção
POST	/doacoes	Registra uma doação (simulação de pagamento/Pix).	Nenhuma

6. Rotas de Administração (Admin)

Essas rotas devem ser protegidas por um mecanismo de Autenticação e Autorização (Bearer Token).
Método	Endpoint	Descrição	Proteção
GET	/admin/animais	Visualiza todos os animais (incluindo adotados) e seus pedidos. Suporta filtros avançados.	Admin
PATCH	/admin/animais/:id	Atualiza status do animal (castrado, vacinado, adotado, etc.).	Admin
DELETE	/admin/animais/:id	Remove um animal da base de dados.	Admin

🔒 Regras de Negócio e Validações

Estrutura do Banco de Dados

Todas as tabelas devem conter os campos de timestamps (createdAt e updatedAt) e possuir validações coerentes (e.g., campos obrigatórios com allowNull: false, campos de e-mail com validação de formato e unicidade, etc.).

Segurança

    Criptografia de Senhas: O uso da biblioteca encryptjs é obrigatório para salvar senhas de usuários/tutores no banco de dados.

    Autorização: As rotas de Admin (ex: /admin/animais, PATCH /animais/:id, DELETE /animais/:id) devem ser protegidas. Apenas usuários autenticados com o perfil de administrador devem ter acesso.

Pedido de Adoção (POST /adocoes)

    O tutor deve ter respondido o questionário obrigatório para criar um pedido.

    É validado se o tutor ou animal existem (404 Not Found).

    É verificado se já existe um pedido ativo para o mesmo tutor e animal (409 Conflict).

    Os pedidos devem ser organizados e processados por ordem de chegada (fila) para cada pet.

    O status inicial do pedido é em_analise.

    Ao deletar um pedido (futura rota de Admin/Usuário), a fila deve ser reajustada.

Imagens

    O campo foto no cadastro de animal (POST /animais) deve ser tratado para salvar o buffer (dados binários) da imagem. Para SQLite/Sequelize, o tipo BLOB é o mais adequado.
