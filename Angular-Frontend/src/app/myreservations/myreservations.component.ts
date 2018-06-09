import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { NewreservationService } from '../service/newreservation.service';
@Component({
  selector: 'app-myreservations',
  templateUrl: './myreservations.component.html',
  styleUrls: ['./myreservations.component.css']
})
export class MyreservationsComponent implements OnInit {
  myReservations=[]
  constructor(
    private userService:UserService,
    private reservationService:NewreservationService
  ) { }

  ngOnInit() {
    var userdata = JSON.parse(localStorage.getItem('UserData'));
    var username={
      username:userdata.username
    }
    this.userService.getReservationsOfUser(username).subscribe(res=>{
      //console.log(res.reservations)
      this.myReservations=res.reservations;
      });
  }
  deleteReservation(event:any){
  
  //  var reservation={
  //    _id:event.target.name
  //  }
  //  this.reservationService.deleteReservation(reservation).subscribe(res=>{
  //   console.log(res.msg)
  //   });
  event.target.parentElement.parentElement.remove()
  }

}
