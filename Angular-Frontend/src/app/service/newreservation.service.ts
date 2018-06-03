import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NewreservationService {
 lab_date:any;
  constructor(
    private http:Http
  ) { }
  findTimeSlots(lab_date){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/reservation/findTimeSlots',lab_date,{headers:headers}).map(res=>res.json());
  }
  
  addReservation(newreservation){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/reservation/newreservation',newreservation,{headers:headers}).map(res=>res.json());
  }
  getAllReservations(){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/reservation/currentreservations',"",{headers:headers}).map(res=>res.json());
  }
  getReservationsForWeek(week){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/reservation/getreservationsforweek',week,{headers:headers}).map(res=>res.json());
  }
}
