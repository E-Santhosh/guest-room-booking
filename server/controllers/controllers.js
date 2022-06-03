//student controllers
//render page
const mysql=require("mysql");

var express=require("express");
require('dotenv').config();





//Mysql
const con=mysql.createPool({
    connectionLimit:10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



 

    exports.authenticate=(req,res)=>{
        var email=req.body.email;
        var password=req.body.password;
       
       
        con.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
          if (error) {
              res.json({
                status:false,
                message:'query error'
                })
          }else{
           
            if(results.length >0){
      decryptedString =(results[0].password);
                    if(password==decryptedString){
                      res.redirect("dashboard");
                }else{
                    res.json({
                      status:false,
                      message:"Email and password does not match"
                     });
                }
              
            }
            else{
              res.json({
                  status:false,    
                message:"Email does not exits"
              });
            }
          }
        });
    }

    exports.ownauthenticate=(req,res)=>{
        var email=req.body.email;
        var password=req.body.password;
       
       
        con.query('SELECT * FROM houseowner WHERE email = ?',[email], function (error, results, fields) {
          if (error) {
              res.json({
                status:false,
                message:'query error'
                })
          }else{
           
            if(results.length >0){
      decryptedString =(results[0].password);
                    if(password==decryptedString){
                        res.redirect("table");
                }else{
                    res.json({
                      status:false,
                      message:"Email and password does not match"
                     });
                }
              
            }
            else{
              res.json({
                  status:false,    
                message:"Email does not exits"
              });
            }
          }
        });
    }


    //view table details
    exports.view=(req,res)=>{
      con.getConnection((err,Connection)=>{
          if(err) throw err
          console.log("connection success");

          Connection.query("select * from room_details",(err,rows)=>{
      Connection.release();
              if(!err){
                  // console.log("good");
                  res.render("table",{rows});
              }
              else{
                  console.log("Error in listing data"+err);
              }

          });
      });
     
  }
    
  
  //adduser function

exports.adduser=(req,res)=>{
  res.render("adduser");

}

//adding 
exports.save=(req,res)=>{
  con.getConnection((err,connection)=>
  {
      if(err) throw err

      const {room_name,room_size,noOfCots,location,duration,rent,image}=req.body;
      connection.query("insert into room_details (room_name,room_size,noOfCots,location,duration,rent,image) values (?,?,?,?,?,?,?)",[room_name,room_size,noOfCots,location,duration,rent,image],(err,rows)=>
      {
          connection.release();
          if(!err){
              res.render("adduser",{msg:"Room Details Added Sucessfully!!"});
          }
          else{
              console.log("Error in Listing Data "+err);
          }
      });
 
  });
}

//show details in edit user
exports.edituser=(req,res)=>{

  con.getConnection((err,connection)=>
  {
      if(err) throw err
      //get id from url
      let id=req.params.id;

      connection.query("select * from room_details where id=?",[id],(err,rows)=>
      {
          connection.release();
          if(!err){
              res.render('edituser',{rows});
          }
          else{
              console.log("Error in Listing Data "+err);
          }
      });
 
  });

}

//update room details
exports.edit=(req,res)=>{
  con.getConnection((err,connection)=>
  {
      if(err) throw err

      const {room_name,room_size,noOfCots,location,duration,rent,image}=req.body;
      let id=req.params.id;

      connection.query("update room_details set room_name=?,room_size=?,noOfCots=?,location=?,duration=?,rent=?,image=? where id=? ",[room_name,room_size,noOfCots,location,duration,rent,image,id],(err,rows)=>
      {
          connection.release();
          if(!err){

              con.getConnection((err,connection)=>
              {
                  if(err) throw err
                  //get id from url
                  let id=req.params.id;
          
                  connection.query("select * from room_details where id=?",[id],(err,rows)=>
                  {
                      connection.release();
                      if(!err){
                          res.render("edituser",{rows,msg:"Room Details Updated Sucessfully!!"});
                      }
                      else{
                          console.log("Error in Listing Data "+err);
                      }
                  });
             
              });
          

              
          }
          else{
              console.log("Error in Listing Data "+err);
          }
      });
 
  });
}

//delete 

exports.delete=(req,res)=>{
  con.getConnection((err,connection)=>{
      if(err) throw err
      //get id from url
      let id=req.params.id;
      connection.query("delete from room_details where id=?",[id],(err,rows)=>{
          connection.release();
          if(!err){
          res.redirect("/table");
          }
          else{
              console.log(err);
          }
      });
  });
};


   // var Cryptr = require('Cryptr');
    exports.register=(req,res)=>{
        var today = new Date();
      //var encryptedString = Cryptr.encrypt(req.body.password);
        var users={
            "name":req.body.name,
            "email":req.body.email,
            "mobile":req.body.mobile,
            "password":req.body.password,
            "created_at":today,
            "updated_at":today
        }
        con.query('INSERT INTO  users  SET ?',users, function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'error with query'
            })
          }else{
            res.redirect("cRegister");
          }
        });
    }



    exports.oregister=(req,res)=>{
        var today = new Date();
      //var encryptedString = Cryptr.encrypt(req.body.password);
        var users={
            "name":req.body.name,
            "email":req.body.email,
            "mobile":req.body.mobile,
            "password":req.body.password,
            "created_at":today,
            "updated_at":today
        }
        con.query('INSERT INTO  houseowner  SET ?',users, function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'error with query'
            })
          }else{
            res.redirect("oRegister");
          }
        });
    }



    exports.home=(req,res)=>{
        res.render("home");
    }


    exports.creg=(req,res)=>{
        res.render("cRegister");
    }

    exports.oreg=(req,res)=>{
        res.render("oRegister");
    }


    exports.clogin=(req,res)=>{
        res.render("clogin");
    }

    exports.ologin=(req,res)=>{
        res.render("ologin");
    }
    exports.home1=(req,res)=>{
      res.render("home1");
  }
  exports.book=(req,res)=>{
    res.render("book");
}
exports.rooms=(req,res)=>{
  res.render("rooms");
}
exports.dashboard=(req,res)=>{
  res.render("dashboard");
}
exports.rooms1=(req,res)=>{
  res.render("rooms1");
}


    





    