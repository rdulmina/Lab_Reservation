var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:String,
  password:String,
  firstname:String,
  lastname:String,
  email:String,
  type:String
});

module.exports=mongoose.model('user',userSchema);

module.exports.addUser=function(newuser,callback){
  this.findByUsername(newuser.username,function(err,user){
  if(!user){
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(newuser.password, salt);
  newuser.password=hash;
  newuser.save(callback(err,"User Registered"));
 
  }
  else{
    
    callback(err,"Username already exsists"); 
  }
  });

}
module.exports.findByUsername=function(username,callback){
  const query={username:username}
  this.findOne(query,callback);
}
module.exports.allUsers=function(callback){
  this.find({ username: { $ne:'admin'} },callback);
}
module.exports.deleteUser=function(_id,callback){
  const query={_id:_id}
  this.remove(query,callback);
}
module.exports.updateUser=function(newUserDetail,callback){
  const query={username:newUserDetail.username}
  this.update(query,newUserDetail,callback);
}