var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
  labName:String,
  date:Date,
  time:String,
  username:String
});
module.exports=mongoose.model('reservation',reservationSchema);

//add new reservation
module.exports.addReservation=function(newreservation,callback){
    newreservation.save(callback);
}

//find available time slots for puticular lab name and date
module.exports.findTimeSlots=function(labName,date,callback){
    date.concat("T00:00:00Z");
    labName=labName.toLowerCase();
    const query={labName:labName,date:date}
    var allTimeSlots=["8-10","10-12","1-3","3-5"];
   
    this.find(query,function(err,reservations){
    if(err) throw err;
    for (i=0; i < reservations.length; i++) { 
        
         var elementIndex=allTimeSlots.indexOf(reservations[i].time);
         if(elementIndex!=-1){
             allTimeSlots.splice(elementIndex,1);
         }
    }
    callback(err,allTimeSlots);
    });

}
module.exports.getAllReservations=function(callback){
    this.find({},callback);
}
module.exports.myreservations=function(username,callback){
    this.find({username:username},callback);
  
}
module.exports.deleteReservation=function(_id,callback){
    this.remove({_id:_id},callback);
    
}
