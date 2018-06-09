import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

  constructor(
    private http:Http
  ) { }

  getReservationsOfUser(username){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/reservation/currentreservations',username,{headers:headers}).map(res=>res.json());
  }

}
