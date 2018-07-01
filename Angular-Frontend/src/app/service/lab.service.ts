import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LabService {

  constructor(
    private http:Http
  ) { }
  getAllLabs(){
    let headers=new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/lab/getalllabs',"",{headers:headers}).map(res=>res.json());
  }
}
