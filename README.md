# myproject
1.	Faça um clone do repositório do projeto para a sua máquina.
2.	Crie um banco de dados com o nome “nodejs” (utf8 , utf8_unicode_ci) e faça uma importação do arquivo nodejs.sql dentro da pasta db.
3.	Abaixo do comentário “//Mysql Connect” no arquivo app.js, informe os dados de conexão do seu banco de dados. Caso utilize a versão mais recente do SQL necessitará usar outro usuário que não seja o root.  Caso não o tenha, crie um novo usuário ( CREATE USER 'nomeUsuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'passUser'; )e conceda os privilégios necessários ( GRANT ALL PRIVILEGES ON * . * TO ‘nomeUsuario’@’localhost’; ) 
4.	Acesse a pasta do projeto pelo terminal e execute “nodemon app.js”.
5.	O projeto estará disponível em http://localhost:3000.

