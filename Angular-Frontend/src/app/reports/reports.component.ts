import { Component, OnInit } from '@angular/core';
import { LabService } from '../service/lab.service';
import { UserService } from '../service/user.service';
import { NewreservationService } from '../service/newreservation.service';
import { createCipheriv } from 'crypto';
var jsPDF = require('jspdf');
require('jspdf-autotable');
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reservationFreq=[];
  reservationFreqJson=[];
  allReservations=[];
  allLabs=[];
  tuples=[];
  year=0;
  date=0
  thismonth=""
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  month="";
  users=[]
  user=false;

  constructor(
    private userService:UserService,
    private lab_service:LabService,
    private reservation_service:NewreservationService
  ) { }

  ngOnInit() {
    this.lab_service.getAllLabs().subscribe(res=>{
     this.allLabs=res.labs;
    });

    this.userService.getAllUsers().subscribe(res=>{
      this.users=res.users;
    });

    this.reservation_service.getAllReservations().subscribe(res=>{ 
      this.allReservations=res.reservations;
      var d = new Date();
      this.date=d.getDate();
      this.year=d.getFullYear()
      this.thismonth=this.month=this.monthNames[d.getMonth()]
      var thisMonth = d.getMonth()+1;
      this.calculateFreq(thisMonth);
    });
    
  }

  calculateFreq(month){
    this.reservationFreqJson=[];
    this.reservationFreq=[];
    this.month=this.monthNames[month-1]
    if(!this.user){
      for(let lab of this.allLabs){
        this.reservationFreq[lab.labName]=0;
      } 
      for(let reservation of this.allReservations){
        var reservationMonth =reservation.date.substring(6,7)
        if(reservationMonth==month){
          this.reservationFreq[reservation.labName]++;
        }
      }
    }
    else{
      for(let user of this.users){
        this.reservationFreq[user.username]=0;
      } 
      for(let reservation of this.allReservations){
        var reservationMonth =reservation.date.substring(6,7)
        if(reservationMonth==month){
          this.reservationFreq[reservation.username]++;
        }
      }

    }
    //sorting the labs by decending order by its number of reservations for this month
    this.tuples = [];
    //convert reservationFreq objec to an array
    for (var key in this.reservationFreq) this.tuples.push([key, this.reservationFreq[key]]);
    //sort array
    this.tuples.sort(function(a, b) { //pass a compair function
        a = a[1];
        b = b[1];
    
        return a > b ? -1 : (a < b ? 1 : 0);
    });
    
    for (var i = 0; i < this.tuples.length; i++) {
     
        //making json object array
        this.reservationFreqJson.push({
          name:this.tuples[i][0],
          count:this.tuples[i][1]
        });
        
    }
  
  }

  showReservations(event:any){
    this.calculateFreq(event.target.id)
  }

  monthlyLabReservations(){
    var caption=""
    var title=""
    if(this.user){
      var columns =["User Name", "Number Of Reservations"];
      caption="Reservations By User Report Of ";
      title='Monthly_lab_reservations_by_users.pdf';
    }
    else{
      var columns =["Lab Name", "Number Of Reservations"];
      caption="Monthly Reservations Report Of ";
      title='Monthly_lab_reservations.pdf';
    }
   
    var rows =this.tuples;

    var doc = new jsPDF();
    var b=this;
    // doc.text("Monthly Reservations Report")
    doc.autoTable(columns, rows,{
    
   
      margin: {top: 35},
      addPageContent: function(data) {
        doc.text(caption+b.year+" "+b.month, 50, 20);
        doc.text("Date : "+b.year+" "+b.thismonth+" "+b.date, 14, 28,{
          fontSize: 7
        })
      }});
    doc.save(title); 

  }
  
  setReport(val){
    this.user=val;
    var d = new Date();
    var thisMonth = d.getMonth()+1;
    this.calculateFreq(thisMonth);
  }
 
}
