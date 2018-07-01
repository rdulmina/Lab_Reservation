var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Counters = new Schema({
//     _id: String,
//     sequence_value: Number     
//   });
var labSchema = new Schema({
  labName:String
});

// var Counter = mongoose.model('counters', Counters);

// function getNextSequenceValue(sequenceName){

//     var sequenceDocument =Counter.findOneAndUpdate({
//        query:{_id: sequenceName },
//        update: {$inc:{sequence_value:1}},
//        new:true
//     });
//     console.log(sequenceDocument)
//     return sequenceDocument.sequence_value;
//  }
module.exports=mongoose.model('lab',labSchema);

module.exports.addLab=function(newlab,callback){
    // newlab._id=getNextSequenceValue('labNo');
    const query={labName:newlab.labName}
    this.findOne(query,function(err,lab){
      if(err) throw err;
      if(lab){
        console.log("this lab already exsists");
      }
      else{
        newlab.save(callback);
      }
    });
 
}
module.exports.getAllLabs=function(callback){
  
  this.find({},callback);
}