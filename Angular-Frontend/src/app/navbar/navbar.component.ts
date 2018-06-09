import { Component, OnInit } from '@angular/core';
import {Router}  from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedout=true;
  loggedin=false;
  username:String;
  password:String;
  currentuname:String;

  constructor(
    private router:Router,private authservice:AuthService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('Loggedin')){//if user already logged in
      this.loggedin=true;
      this.loggedout=false;
      var userdata = JSON.parse(localStorage.getItem('UserData'));
      this.currentuname=userdata.username;
    }
  } 
  login(){
    var user={
      username:this.username,
      password:this.password
    }
    console.log(user)
    this.authservice.authenticate(user).subscribe(res=>{
      if(res.userdata=="Invalid User" || res.userdata=="Incorrect Password"){
        console.log(res.userdata);
      }
      else{
      this.currentuname=res.userdata.username;
      this.loggedin=true;
      this.loggedout=false;
      localStorage.setItem('Loggedin','true');
      localStorage.setItem('UserData',JSON.stringify(res.userdata));
      }
    })
  }
  logout(){
      this.loggedin=false;
      this.loggedout=true;
      localStorage.clear();
  }
}
