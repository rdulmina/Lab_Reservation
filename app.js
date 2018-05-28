var express=require('express');
var path=require('path');
var mongoose=require('mongoose');
var dbcon=require('./config/database');
var app=express();
var user=require('./routes/users_router');
var reservation=require('./routes/reservations_route');
var lab=require('./routes/labs_rout');

var cors=require('cors');
app.use(cors());
//database connection
var connection=mongoose.connect(dbcon.database);
if(connection){
    console.log('done');
}
else{
    console.log('db error');
}

//static files path frontend
app.use(express.static(path.join(__dirname,"public")));

//rout handling
app.use('/user',user);
app.use('/reservation',reservation);
app.use('/lab',lab);


app.listen(3000,function(){
    console.log('Node server is up');
})