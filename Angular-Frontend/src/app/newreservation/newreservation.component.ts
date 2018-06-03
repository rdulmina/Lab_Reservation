import { Component, OnInit } from '@angular/core';
import { NewreservationService } from '../service/newreservation.service';
import { LabService } from '../service/lab.service';
@Component({
  selector: 'app-newreservation',
  templateUrl: './newreservation.component.html',
  styleUrls: ['./newreservation.component.css']
})
export class NewreservationComponent implements OnInit {
  labName=String;
  date="";
  timeSlots=[];
  allLabs=[];
  time=String;

  constructor(
    private newreservation_service:NewreservationService,
    private lab_service:LabService
  ) { }
  
  ngOnInit() {
    //get all lab details from db
    this.lab_service.getAllLabs().subscribe(res=>{
      this.allLabs=res.labs;
      });
  }

  //check if the selected date is passed
  dateValidation(event){
     var pickedDate = event.target.value.replace(/-/g, "");
     var currentdate= new Date().toJSON().toString().substring(0,10).replace(/-/g, "");
     return pickedDate>=currentdate;
  }
  
  findtimeslots(event:any){
  
    this.date=event.target.value;
    
    if(this.dateValidation(event)){
      console.log("date valid");
      var lab_date={
        labName:this.labName,
        date:this.date
      }
      console.log(JSON.stringify(lab_date));
      this.newreservation_service.findTimeSlots(lab_date).subscribe(res=>{
      this.timeSlots=res.timeSlots;
      console.log(this.timeSlots)
      })
    }
    else{
      console.log("invalid date");
    }
    //  console.log();
     
  }
  labChanged(){
    console.log(this.date)
    if(this.date){
      var lab_date={
        labName:this.labName,
        date:this.date
      }
      this.newreservation_service.findTimeSlots(lab_date).subscribe(res=>{
      this.timeSlots=res.timeSlots;
      console.log(this.timeSlots)
      });
    }
  }
  addReservation(){
    var username=JSON.parse(localStorage.getItem('UserData')).username;
    var newReservation={
      labName:this.labName,
      date:this.date,
      time:this.time,
      username:username
    }
    //console.log(newReservation)
    this.newreservation_service.addReservation(newReservation).subscribe(res=>{
    
     console.log(res.msg);
      });
  }
}
