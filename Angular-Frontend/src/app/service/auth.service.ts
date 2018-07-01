import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  user:any; 
  constructor(
    private http:Http
  ) { }

  authenticate(user){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/user/login',user,{headers:headers}).map(res=>res.json());
  }

}
