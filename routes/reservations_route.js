var express=require('express');
var bodyparser=require('body-parser');
var Reservation=require('../models/reservation_model');

var router=express.Router();
router.use(bodyparser());

router.post('/newreservation',function(req,res){
    var newReservation=new Reservation({
        labName:req.body.labName.toLowerCase(),
        date:req.body.date,
        time:req.body.time,
        username:req.body.username.toLowerCase()
    });

    Reservation.addReservation(newReservation,function(err,Reservation){
        if (err) throw err;
        console.log(Reservation);
        res.json({msg:"New reservation added"});
        
    })
});

//find available time slots for puticular lab name and date
router.post('/findtimeslots',function(req,res){
    
    Reservation.findTimeSlots(req.body.labName,req.body.date,function(err,timeSlots){
        console.log(timeSlots);
        res.json({timeSlots:timeSlots});
    })
})
//get all current reservations
router.post('/currentreservations',function(req,res){
    
    Reservation.getAllReservations(function(err,reservations){
        console.log(reservations)
        res.json({reservations:reservations});
    })
})
// //get reservation for the given week
// router.post('/getreservationsforweek',function(req,res){
    
//     Reservation.getReservationsForWeek(req.body.week,function(err,reservations){
//         console.log(reservations)
//         res.json({reservations:reservations});
//     })
// })
//get reservations for given user
router.post('/myreservations',function(req,res){
    
    Reservation.myReservations(req.body.username,function(err,reservations){
        console.log(reservations)
        res.json({reservations:reservations});
    })
})
router.post('/deletereservation',function(req,res){
    
    Reservation.deleteReservation(req.body._id,function(err,reservations){
        if (err) throw err;
        res.json({msg:"reservation deleted"});
    })
})
module.exports=router;