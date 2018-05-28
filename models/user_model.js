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
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(newuser.password, salt);
  newuser.password=hash;
  newuser.save(callback);

}
module.exports.findByUsername=function(username,callback){
  const query={username:username}
  this.findOne(query,callback);
}