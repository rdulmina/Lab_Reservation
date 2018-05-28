var express=require('express');
var bodyparser=require('body-parser');
var User=require('../models/user_model');
var bcrypt = require('bcryptjs');
var session = require('express-session')

var router=express.Router();
router.use(bodyparser());

//session secret
router.use(session({secret: "Shh, its a secret!"}));

router.post('/register',function(req,res){
 var newUser=new User({
    username:req.body.username,
    password:req.body.password,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email
 })

 User.addUser(newUser,function(err,user){
    if(err) throw err;
    res.end("user inserted");
 });

});
router.post('/login',function(req,res){
    username=req.body.username
    password=req.body.password

    User.findByUsername(username,function(err,user){
        if(err) throw err;
        if(!user){
            res.end("Invalid Username")
        }
        else{
        var hash=user.password;
        if(bcrypt.compareSync(password, hash)){
           //create session
           req.session.username=user.username;
           req.session.firstname=user.firstname;
           req.session.lastname=user.lastname;
           req.session.email=user.email;
           res.json({userdata: req.session});
        }
        else{
            res.json({msg:'Incorrect Password'});
        }
    }
        
    });
   });
module.exports=router;