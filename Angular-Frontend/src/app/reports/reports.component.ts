import { Component, OnInit } from '@angular/core';
import { LabService } from '../service/lab.service';
import { NewreservationService } from '../service/newreservation.service';
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
  constructor(
    private lab_service:LabService,
    private reservation_service:NewreservationService
  ) { }

  ngOnInit() {
    this.lab_service.getAllLabs().subscribe(res=>{
     this.allLabs=res.labs;
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
    this.month=this.monthNames[month-1]
    for(let lab of this.allLabs){
      this.reservationFreq[lab.labName]=0;
    } 
    for(let reservation of this.allReservations){
      var reservationMonth =reservation.date.substring(6,7)
      if(reservationMonth==month){
        this.reservationFreq[reservation.labName]++;
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
          labName:this.tuples[i][0],
          count:this.tuples[i][1]
        });
        
    }
  
  }

  showReservations(event:any){
    this.calculateFreq(event.target.id)
  }

  monthlyLabReservations(){
    var columns =["Lab Name", "Number Of Reservations"];
    var rows =this.tuples;

    var doc = new jsPDF();
    var b=this;
    // doc.text("Monthly Reservations Report")
    doc.autoTable(columns, rows,{
    
   
      margin: {top: 35},
      addPageContent: function(data) {
        doc.text("Monthly Reservations Report Of "+b.year+" "+b.month, 50, 20);
        doc.text("Date : "+b.year+" "+b.thismonth+" "+b.date, 14, 28,{
          fontSize: 7
        })
      }});
    doc.save('Monthly_lab_reservations.pdf'); 

  }
  
 
   
  

}
