const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var url = 'mongodb://ckane144:country144@ds255787.mlab.com:55787/dashboard-app'
var databaseName = 'dashboard-app'

var localUrl = 'mongodb://localhost:27017/MyApplication'
var localDatabaseName = 'MyApplication'

var db
var port = 8080
MongoClient.connect(localUrl, (err, database) => {
    if (err){
        return console.log(err)
    } else{
        console.log("Successfully connected to mongodb server ...")
    }
    db = database.db(localDatabaseName)
    app.listen(port , () => {
        console.log('listening on '+ port)
    })
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    //__dirname is directory that contains the JavaScript source code
    db.collection('TestCollection').find().toArray((err,results)=>{
        console.log(results)
    })
    res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', (req, res) => {
    db.collection('TestCollection').save(req.body, (err, result) => {
        if(err) {return console.log(err)}
        else{ console.log("Successfully inserted into TestCollection")}
    })
    res.redirect('/')
})