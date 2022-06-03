const express = require("express");
const exphbs=require("express-handlebars");
const bodyParser=require("body-parser");
const mysql=require("mysql");
const Connection = require("mysql/lib/Connection");
var Cryptr = require('cryptr');

//env file import
require('dotenv').config();

//listening port 
const app=express();
const port=process.env.PORT || 1212 ;

 
//java script object notation
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false})); 



//static files
app.use(express.static("public"));
app.use('/views',express.static(__dirname+'/views'));
app.use('/public',express.static(__dirname+'/public'));


//template engine
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

//listen
app.listen(port,()=>{
    console.log("listening port : "+port);
});

const routes=require("./server/routes/room");
app.use('/',routes);
app.use('/table',routes);
app.use('/cRegister',routes);

