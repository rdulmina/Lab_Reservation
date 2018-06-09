import { Component, OnInit} from '@angular/core';
import { LabService } from '../service/lab.service';
import { NewreservationService } from '../service/newreservation.service';
import * as $ from "jquery"
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent implements OnInit {
  allLabs=[];
  week="";
  month=0;
  reservations=[];
  timeSlots=['8-10','10-12','1-3','3-5'];
  date={"su":0,"mo":0,"tu":0,"we":0,"th":0,"fr":0,"sa":0};
  constructor(
    private lab_service:LabService,
    private reservation_service:NewreservationService
  ) { }
 
  ngOnInit() {
    
    this.lab_service.getAllLabs().subscribe(res=>{
    this.allLabs=res.labs;});
    this.getReservations();
    
  }
  
  getReservations(){
    this.reservation_service.getAllReservations().subscribe(res=>{ 
      this.reservations=res.reservations;
      });  
   
  }
  showReservations(event:any){
    this.week=event.target.value;
    var startdate=parseInt(this.week.substring(3,5));
    this.month=parseInt(this.week.substring(0,2))
 
    this.date.su=startdate++;
    this.date.mo=startdate++;
    this.date.tu=startdate++;
    this.date.we=startdate++;
    this.date.th=startdate++;
    this.date.fr=startdate++;
    this.date.sa=startdate++;
  }

  isReserved(labname,date,time){
   
    var newStartdate=this.week.substring(0,8);
    newStartdate=newStartdate.substring(6,8)+newStartdate.substring(0,2)+newStartdate.substring(3,5);
    var newEndtdate=this.week.substring(9,17);
    var enddate=parseInt(newEndtdate.substring(6,8)+newEndtdate.substring(0,2)+newEndtdate.substring(3,5));
    var reserved=false;
    var self = this;
    this.reservations.forEach(function(item, index, object) {
  
        var reservationDate =parseInt(item.date.substring(8,10).replace(/-/g, ""));
        var reservationMonth=parseInt(item.date.substring(6,8).replace(/-/g, ""))
     
        if(item.labName==labname && item.time==time && self.month==reservationMonth && reservationDate==date){
          reserved=true;
          
        }
    });
    return reserved;
  }

  objectKeys(obj) {
    return Object.keys(obj); 
  }
  
}
