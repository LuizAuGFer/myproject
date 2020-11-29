const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require ('express-handlebars');
const app=express();
const urlencodeParser = bodyParser.urlencoded({extended:false});

//Mysql Connect
const sql=mysql.createConnection({
    host: 'localhost',
    user: 'luiz',
    password: '9922',
    port: '3306'
});
sql.query("use nodejs");
app.use(bodyParser.json());

//Start Server
app.listen(3000, function(req, res){
    console.log('Servidor rodando');
});

//Template Engine
app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));


//Routes and Templates
app.get('/', function(req, res){
    sql.query("SELECT * FROM comment", function(err, results, fields){
        res.render('index', {data: results});
        
    });
   
});
app.post('/insert', urlencodeParser, function(req, res ){
    sql.query("INSERT INTO comment  (dsc_comment) VALUES ('"+[req.body.comment]+"')");
    res.redirect('/');  
});

app.post('/speat', urlencodeParser, function(req, res){
    
});

