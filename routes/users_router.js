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
var type="user"
if(req.body.username=="admin"){
    type="admin";
}   
 var newUser=new User({
    username:req.body.username.toLowerCase(),
    password:req.body.password,
    firstname:req.body.firstname.toLowerCase(),
    lastname:req.body.lastname.toLowerCase(),
    email:req.body.email.toLowerCase(),
    type:type
 })

 User.addUser(newUser,function(err,message){
    if(err) throw err;
    res.json({msg:message});
    
 });
});
router.post('/login',function(req,res){
    username=req.body.username.toLowerCase();
    password=req.body.password

    User.findByUsername(username,function(err,user){
        if(err) throw err;
        if(!user){
            res.json({userdata:"Invalid User"})
        }
        else{
        var hash=user.password;
        if(bcrypt.compareSync(password, hash)){
           //create session
           req.session.username=user.username;
           req.session.firstname=user.firstname;
           req.session.lastname=user.lastname;
           req.session.email=user.email;
           req.session.type=user.type;
           res.json({userdata: req.session});
        }
        else{
            res.json({userdata:'Incorrect Password'});
        }
    }
        
    });
   });
router.post('/allusers',function(req,res){
    User.allUsers(function(err,users){
        if (err) throw err;
        res.json({users:users})
    })
    
});
router.post('/delete',function(req,res){
    User.deleteUser(req.body._id,function(err,user){
        if (err) throw err;
        console.log(user);
       // res.json({msg:users})
    })
    
});  
router.post('/update',function(req,res){
    User.updateUser(req.body,function(err,msg){
         if (err) throw err;
         res.json({msg:msg})
    })
    
}); 
router.post('/changepass',function(req,res){
    User.changePassword(req.body,function(err,msg){
         if (err) throw err;
         res.json({msg:msg})
    })
    
}); 
module.exports=router;