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
import { ManageemployeesComponent } from './manageemployees/manageemployees.component';
import { ManagelabsComponent } from './managelabs/managelabs.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const applicationrouts:Routes=[
  {path:'newreservation',component:NewreservationComponent},
  {path:'myreservations',component:MyreservationsComponent},
  {path:'manageemployees',component:ManageemployeesComponent},
  {path:'managelabs',component:ManagelabsComponent},
  {path:'reports',component:ReportsComponent},
  {path:'settings',component:SettingsComponent},
  {path:'',component:ReservationsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReservationsComponent,
    NewreservationComponent,
    MyreservationsComponent,
    ManageemployeesComponent,
    ManagelabsComponent,
    ReportsComponent,
    SettingsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,     
    RouterModule.forRoot(applicationrouts),
    AngularFontAwesomeModule,
    NgbModule.forRoot()

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
