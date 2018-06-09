import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { NewreservationComponent } from './newreservation/newreservation.component';
import { AuthService } from './service/auth.service';
import { NewreservationService } from './service/newreservation.service';
import { LabService } from './service/lab.service';
import { UserService } from './service/user.service';
import { HttpModule } from '@angular/http';
import { MyreservationsComponent } from './myreservations/myreservations.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const applicationrouts:Routes=[
  {path:'newreservation',component:NewreservationComponent},
  {path:'myreservations',component:MyreservationsComponent},
  {path:'settings',component:NewreservationComponent},
  {path:'',component:ReservationsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReservationsComponent,
    NewreservationComponent,
    MyreservationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,     
    RouterModule.forRoot(applicationrouts),
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    NewreservationService,
    LabService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
