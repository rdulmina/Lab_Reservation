var express=require('express');
var bodyparser=require('body-parser');
var Reservation=require('../models/reservation_model');

var router=express.Router();
router.use(bodyparser());

router.post('/newreservation ',function(req,res){
    var newReservation=new Reservation({
        _id:0,
        labNo:req.body.labNo,
        date:req.body.date,
        time:req.body.time,
        username:req.body.username
    });

    Reservation.addReservation(newReservation,function(err,Reservation){
        if (err) throw err;
        console.log("New reservation added")
    })
});
module.exports=router;