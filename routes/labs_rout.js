var express=require('express');
var bodyparser=require('body-parser');
var Lab=require('../models/lab_model');

var router=express.Router();
router.use(bodyparser());

router.post('/newlab',function(req,res){
    var newLab=new Lab({
        _id:0,
        labName:req.body.labname
    });
    Lab.addLab(newLab,function(err,Lab){
        if(err) throw err;
        res.end("New lab added");
    });
});
module.exports=router;