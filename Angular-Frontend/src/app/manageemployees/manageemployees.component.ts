import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-manageemployees',
  templateUrl: './manageemployees.component.html',
  styleUrls: ['./manageemployees.component.css']
})
export class ManageemployeesComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }
  users=[];

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res=>{
      console.log(res);
      this.users=res.users;
    });
  }

}
