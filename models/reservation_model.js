var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var reservationSchema = new Schema({
  _id:Number,
  labNo:Number,
  date:Date,
  time:String,
  username:String
});
function getNextSequenceValue(sequenceName){

    var sequenceDocument = db.counters.findAndModify({
       query:{_id: sequenceName },
       update: {$inc:{sequence_value:1}},
       new:true
    });
     
    return sequenceDocument.sequence_value;
 }
module.exports=mongoose.model('reservation',reservationSchema);

module.exports.addReservation=function(newreservation,callback){
    newreservation._id=getNextSequenceValue('reservationNo');
    newreservation.save(callback);

}
// module.exports.findByUsername=function(username,callback){
//   const query={username:username}
//   this.findOne(query,callback);
// }