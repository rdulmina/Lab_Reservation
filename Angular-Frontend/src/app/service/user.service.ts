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
    return this.http.post('http://localhost:3000/reservation/myreservations',username,{headers:headers}).map(res=>res.json());
  }
  getAllUsers(){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/user/allusers','',{headers:headers}).map(res=>res.json());
  }
  registerUser(user){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/user/register',user,{headers:headers}).map(res=>res.json());
  }
  deleteUser(user){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/user/delete',user,{headers:headers}).map(res=>res.json());
  }
  updateUser(newUserDetail){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/user/update',newUserDetail,{headers:headers}).map(res=>res.json());
  }
}
