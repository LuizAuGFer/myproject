const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require ('express-handlebars');
const app=express();

const urlencodeParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());
//Start Server
app.listen(3000, function(req, res){
    console.log('Servidor rodando');
});

app.use(bodyParser.json());
//Template Engine
app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));


//Routes and Templates
app.get('/', function(req, res){
    res.render('index');
});

