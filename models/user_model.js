var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:String,
  password:String,
  firstname:String,
  lastname:String,
  email:String
});

module.exports=mongoose.model('user',userSchema);

module.exports.addUser=function(newuser,callback){
  this.findByUsername(newuser.username,function(err,user){
  if(!user){
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(newuser.password, salt);
  newuser.password=hash;
  console.log("user added")
  newuser.save(callback);
  }
  else{
    console.log("Username already exsists")
    callback(); 
  }
  });

}
module.exports.findByUsername=function(username,callback){
  const query={username:username}
  this.findOne(query,callback);
}