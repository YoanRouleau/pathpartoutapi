
//EXPRESS
var express = require('express');
var app = express();
var port = process.env.port || 3000;

var bodyParser = require('body-parser')

//MONGO DATA
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://yoren:Vathflyo4@cluster0.wwygl.mongodb.net/test?authSource=admin&replicaSet=atlas-deebad-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const dbName = 'PathPartoutApp';


var randonneeRoutes = require('./routes/randonneeRoutes');
var userRoutes = require('./routes/userRoutes');
var sortieRoutes = require('./routes/sortieRoutes');
var basicRoutes = require('./routes/basicRoutes');

MongoClient.connect(url, function(err, client){
    mgClient = client;
    console.log("Connected successfully to PathPartout cluster");
    db = mgClient.db(dbName);
})

module.exports = function(callback){
    var db;
    var mgClient;
}

randonneeRoutes(app);
userRoutes(app);
sortieRoutes(app);
basicRoutes(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(`App running on port ${ port }.`)
app.listen(port)

