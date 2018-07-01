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

const User=module.exports=mongoose.model('user',userSchema);

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
  this.find({ },callback);
}
module.exports.deleteUser=function(_id,callback){
  const query={_id:_id}
  this.remove(query,callback);
}
module.exports.updateUser=function(newUserDetail,callback){
  const query={username:newUserDetail.username}
  this.update(query,newUserDetail,callback);
}
module.exports.changePassword=function(newPassDetail,callback){
  this.findByUsername(newPassDetail.username,function(err,user){
    if(err) throw err;
    if(!user){
        callback(err,"Invalid User")
    }
    else{
    var hash=user.password;
    if(bcrypt.compareSync(newPassDetail.oldpassword, hash)){
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(newPassDetail.newPassword, salt);
      newuser={
        password:hash
      };
      const query={username:newPassDetail.username}
      User.update(query,newuser);
      callback(err,"Password changed");
    }
    else{
      callback(err,"Old password dosen't match");
    }
}
    
});
  
}