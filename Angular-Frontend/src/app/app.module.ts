import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { NewreservationComponent } from './newreservation/newreservation.component';
import { AuthService } from './service/auth.service';
import { HttpModule } from '@angular/http';

const applicationrouts:Routes=[
  {path:'newreservation',component:NewreservationComponent},
  {path:'myreservations',component:NewreservationComponent},
  {path:'settings',component:NewreservationComponent},
  {path:'',component:ReservationsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReservationsComponent,
    NewreservationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,     
    RouterModule.forRoot(applicationrouts)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
