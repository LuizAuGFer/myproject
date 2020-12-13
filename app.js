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
    user: 'nodedb',
    password: 'passnodedb',
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
    authenticator: new IamAuthenticator({ apikey: '' }),
    serviceUrl: ''
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

