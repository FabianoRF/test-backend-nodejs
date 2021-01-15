<h1>Como Executar</ h1>

Esta aplicação esta configurada para rodar com um banco de dados Postgres em conjunto com o typeORM, podendo portanto
funcionar com qualquer outro banco relacional, desde que feitas as configurações no arquivo ormconfig.json do projeto.

Por conveniência aconselho a usar o docker, com o seguinte comando(que executará um container postgres no docker):

`docker run --name postgres_anotaai -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

Apos a criação do container, deve se criar uma base de dados, sugiro criar com o nome "desafio_anotaai" pois o mesmo já esta sendo usado no ormconfig.json. Após execute o seguinte comando para executar a migration, criando assim a tabela no banco:

`yarn typeorm migration:run`

Por fim basta executar a aplicação com o comando:

`yarn dev:server`

<strong>Rotas da API</ strong>

Foram criadas as seguintes rotas conforme solicitado nas histórias:

- POST - /products -> cria um novo produto passando os dados: title, description, price e category por json

Exemplo de requisição:

http://localhost:3333/products
{
	"title": "Produto novo",
	"description": "descricao",
	"price": 123.90,
	"category": "roupas"
}

<hr/>

- PUT- /products/:id -> Edita um produto os dados: title, description, price e category por json, e o "id" como route param

Exemplo de requisição:

http://localhost:3333/products/1232
{
	"title": "Produto editado",
	"description": "Um produto muitadflk adlkfjasdlk",
	"price": 123.90,
	"category": "roupas"
}

<hr/>

- DELETE- /products/:id -> Exclui um determinado produto com o "id" informado pelo parâmetro

Exemplo de requisição:

http://localhost:3333/products/1232

<hr/>

- PATCH- /products/:id -> Altera a categoria de um produto, na qual é passado o "id" por parametro e o "category" pelo body

http://localhost:3333/products/1232
{
	"category": "calçados"
}

<hr/>

- GET - /products -> Lista todos produtos. Também aceita parametros via query params, sendo eles o "category" ou "title"

Exemplos de requisição(usando filtros ou não):

http://localhost:3333/products?category=category_name&title=title_name

http://localhost:3333/products?category=category_name

http://localhost:3333/products


<h2>Observações</h2>

Toda a api foi desenvolvida em typescript, seguindo alguns patterns como repositorie e service, além de injeção de dependencias com tsyringe, de forma a obter uma aplicação "testável". Resalto que as configurações de testes unitários com jest
foram feitas, porém apenas um service foi testado devido ao tempo, peço desculpas por não completar a tempo
