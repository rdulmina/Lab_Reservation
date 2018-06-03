import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { LabService } from '../service/lab.service';
import { NewreservationService } from '../service/newreservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  // @ViewChild('su810') myId: ElementRef;
  allLabs=[];

  constructor(
    private lab_service:LabService,
    private reservation_service:NewreservationService
  ) { }

   
  ngOnInit() {
    
    this.lab_service.getAllLabs().subscribe(res=>{
    this.allLabs=res.labs;});
   

  }
  
  getReservations(){
    this.reservation_service.getAllReservations().subscribe(res=>{
      console.log(res.reservations)});
  }
 
    //  this.myId.nativeElement.classList.add("reserved");
}
