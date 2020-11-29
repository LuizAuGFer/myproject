const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require ('express-handlebars');
const app=express();
const urlencodeParser = bodyParser.urlencoded({extended:false});
const sound = require('sound-play');

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

app.post('/speat', urlencodeParser, function(req, results, res){
  //Text to Speech
  const fs = require('fs');
  const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');
  
  const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({ apikey: 'LahBBLtvB3kh6IlBz6mWkgoU4QAvv80-OlwlbbR1tGAW' }),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/2b4b0051-9587-41a1-9e33-8796bd915016'
  });
  
  const params = {
    text: req.body.listenComment,
    voice: 'pt-BR_IsabelaVoice',
    accept: 'audio/wav'
  };
 
  textToSpeech
    .synthesize(params)
    .then(response => {
      const audio = response.result;
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then(repairedFile => {
      fs.writeFileSync('audio/audio.wav', repairedFile);
      const path = require('path');
      const filePath = path.join(__dirname, 'audio/audio.wav');
      sound.play(filePath);
    })
    .catch(err => {
      console.log(err);
    });
  
  

});

