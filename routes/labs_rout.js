var express=require('express');
var bodyparser=require('body-parser');
var Lab=require('../models/lab_model');

var router=express.Router();
router.use(bodyparser());

router.post('/newlab',function(req,res){
    var newLab=new Lab({
      
        labName:req.body.labname.toLowerCase()
    });
    Lab.addLab(newLab,function(err,Lab){
        if(err) throw err;
        res.end("New lab added");
    });
});

router.post('/getalllabs',function(req,res){
   
    Lab.getAllLabs(function(err,labs){
        if(err) throw err;
        res.json({labs:labs});
       
    });
});
module.exports=router;