//student js
//middleware
//routing
var Cryptr = require('cryptr');
const express = require("express");
const router=express.Router();
const controllers=require("../controllers/controllers");
//const Mastercontroller=require('../controllers/register-controller');

//view records in table
//get methods
router.get("/table",controllers.view);
router.get("/",controllers.home);
router.get("/cRegister",controllers.creg);
router.get("/clogin",controllers.clogin);
router.get("/ologin",controllers.ologin)
router.get("/oRegister",controllers.oreg);
router.get("/home1",controllers.home1);
router.get("/book",controllers.book);
router.get("/dashboard",controllers.dashboard);
router.get("/rooms",controllers.rooms);
router.get("/rooms1",controllers.rooms1);

//post methods
router.post("/cRegister",controllers.register);
router.post("/clogin",controllers.authenticate);
router.post("/oRegister",controllers.oregister);
router.post("/ologin",controllers.ownauthenticate);
//router.post("/upload",controllers.upload);

module.exports=router;

//add new records
router.get("/adduser",controllers.adduser);
router.post("/adduser",controllers.save);
//add new records
router.get("/adduser",controllers.adduser);
router.post("/adduser",controllers.save);
//update records
router.get("/edituser/:id",controllers.edituser);
router.post("/edituser/:id",controllers.edit);
//delete records
router.get("/deleteuser/:id",controllers.delete);

