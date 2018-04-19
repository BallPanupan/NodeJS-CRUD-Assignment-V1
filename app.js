'use strict'

var express = require('express');
var cors = require('cors')
var path = require('path')
var bodyParser = require('body-parser');
var Mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var app = express();

app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
//
app.set('view engine', 'ejs');

//
Mongoose.Promise = global.Promise

const routes = require('./app/routes/router')

const NODE_ENV = process.env.NODE_ENV || 'developement'

//const app = express()


// CONFIG
app.use(cors())
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended: false}))

// Mongoose
const database = (NODE_ENV !== 'test') ? 'pkap_todolists': 'pkap_test'
const mongodbHost = process.env.MONGODB_URL || `127.0.0.1:27017/${database}`

Mongoose.connect(`mongodb://${mongodbHost}`, {useMongoClient: true})
var Schema = Mongoose.Schema;
var pkap_testSchema = new Schema({fname:String,lname:String,sex:String});
var pkap_tests = Mongoose.model("pkap_tests",pkap_testSchema);

// Routes
app.use('/api', routes)

//get
app.get('/',function(req,res){
  res.render('Index')
  console.log("Index Page");
});

app.get('/insert',function(req,res){
  res.render('Insert')
  console.log("Insert Page");
});

//in view has delete
app.get('/views',function(req,res){
    pkap_tests.find('pkap_tests'.toArray,function(ree,result){
      console.log(result);
    res.render('view',{data:result});
  });
  console.log("view Page");

});

app.get('/update/:_id',function(req,res){
  //var _id=req.params._id;
  pkap_tests.findById(req.params._id,function(err, result){

    res.render('update',{data:result})
    console.log("\nview data for update");
    console.log(result);
    });
});

app.get('/delete/:_id',function(req,res) {
  pkap_tests.findById(req.params._id,function(err,pkap_tests){
    pkap_tests.remove();
  });
  res.redirect('/views')
});


//post
app.post('/insert',function(req,res){
  var users = new pkap_tests({
    fname : req.body.fname,
    lname : req.body.lname,
    sex : req.body.sex
  })
  users.save();
  res.redirect('/views')
});

app.post('/update',function(req, res){
  pkap_tests.findById(req.body._id,function(err, result){
    result.fname = req.body.fname;
    result.lname = req.body.lname;
    result.sex = req.body.sex;
    result.save();
  });
  res.redirect('../views');
});



// RUN
const port = 3000
const callback = () => console.log(`SERVER IS RUNNING AT PORT ${port}.`)
app.listen(port, callback)

module.exports = app
