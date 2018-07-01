import { Component, OnInit } from '@angular/core';
import { LabService } from '../service/lab.service';
import { UserService } from '../service/user.service';
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
  reservationsWithDetails=[];
  allReservations=[];
  allLabs=[];
  tuples=[];
  year=0;
  date=0
  week=""
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
      //this.getWeeklyReservations()
    });
    
  }
  
  getWeeklyReservations(week=null){
    this.week=week
    this.reservationsWithDetails=[]
    var startDate="20"+week.substr(6,2)+week.substr(0,2)+week.substr(3,2)
    var endDate="20"+week.substr(6,2)+week.substr(0,2)+week.substr(12,2)
    
     // making reservationsWithDetails array for weekly reservation details report
     this.allReservations.forEach(element => {
       if(element.date.substr(0,10).replace(/-/g, "")<=endDate && element.date.substr(0,10).replace(/-/g, "")>=startDate){
        
        for(var i=0;i<this.users.length;i++){
    
        if(this.users[i].username==element.username){
         
              this.reservationsWithDetails.push([this.users[i].username,this.users[i].firstname,this.users[i].lastname,this.users[i].email,element.date.substr(0,10),element.time,element.labName]);
              break;
            }
      }
    }
      
    }); 
    this.reservationsWithDetails.sort(function(a, b) { //pass a compair function
      a = a[4];
      b = b[4];
  
      return a < b ? -1 : (a > b ? 1 : 0);
  });
  
  }

  calculateFreq(month){
    //this.reservationFreqJson=[];
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
    var freqIndex=4;
    //convert reservationFreq objec to an array
    for (var key in this.reservationFreq){
      if(this.user){
        for(var i=0;i<this.users.length;i++){
          if(this.users[i].username==key){
                this.tuples.push([key,this.users[i].firstname,this.users[i].lastname,this.users[i].email, this.reservationFreq[key]]);
                break;
              }
        }
      }
      else
      {this.tuples.push([key, this.reservationFreq[key]]);
      freqIndex=1;
      }
    }
    //sort array
    this.tuples.sort(function(a, b) { //pass a compair function
        a = a[freqIndex];
        b = b[freqIndex];
    
        return a > b ? -1 : (a < b ? 1 : 0);
    });
    this.reservationFreq=this.tuples;

  }

  showReservations(event:any){
    this.calculateFreq(event.target.id)
  }

  monthlyLabReservations(){
    var caption=""
    var title=""
    if(this.user){
      var columns =["User Name","First Name","Last Name","Email","Number Of Reservations"];
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
  printReservationDetail(){
    var caption="Weekly Reservations Of "
    var title="Weekly_Reservation_Details.pdf"
    var columns =["User Name","First Name","Last Name","Email","Date","Time","Lab Name"];
  
    var doc = new jsPDF();
    var b=this;
    // doc.text("Monthly Reservations Report")
    doc.autoTable(columns, this.reservationsWithDetails,{ 
      margin: {top: 35},
      addPageContent: function(data) {
        doc.text(caption+b.week, 50, 20);
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
