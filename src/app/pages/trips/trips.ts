import { Component, inject, OnInit } from '@angular/core';
import { NestJSService } from '../../services/nestjs.service';
import { HeaderComponent } from "../../components/header/header.component";
import { UserSignal } from '../../services/user';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { EcobankService } from '../../services/ecobank';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-trips',
  providers: [EcobankService],
  imports: [
    HttpClientModule,
    HeaderComponent,
    MatCardModule,
    MatExpansionModule,
    DatePipe],
  templateUrl: './trips.html',
  styleUrl: './trips.scss',
})
export class Trips implements OnInit {

  nestjsService = inject(NestJSService);
  userSignal = inject(UserSignal);
  ecobankService = inject(EcobankService);


  trips :any= [];

  ngOnInit(): void {

    const user = this.userSignal.getUserData();

    this.getTrips(user);
  }

  pay() {

    /*
    this.ecobankService.pay('eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJET01FU1RJQyJdLCJlbnYiOiJVQVQiLCJzdWIiOiJDT1JQT1JBVEVBUEkiLCJhdWQiOiJDTDAwMSIsImlhdCI6MTc4OTc1NzQzMCwiZXhwIjoxNzg5Nzc1NDMwfQ.W7iUgiEbdrr2_LoZZ6PbyKPgLy8fRJcHO5988RslRTi-lwHbOCp8UxdLP0oFD3sRfG-3Ap2EMU7YKatXYsmSD_2c2MXmf9FFbwz93MADu-YZFTZ67Sbtm7XVb3PiOP7CjTdVfrreQlLg78lX-GIENofmAan5GDi04lsfM36M4DpJMysk9KmqLo5ohqid4hln_BHkv5LnAfe7T58KPn_wqJGMsYwMOCplf7cGs4Y7d1ESfVrtANiBwLWFx4D_Ly0abhdASrMGUBGwQ1XbQZGtAfEaaY0rXb_qimRiXkg4LiCQaYRoBbeDlUgpqjhH41JdXEE83tDl3rq7ryKTGjlGPg').subscribe({
      next: response => {
        console.log('Ecobank Payment:', response);
      },
      error: error => {
        console.error('Ecobank Payment ERROR:', error);
      }
    });
    */
  }


  /*
  getToken() {
    this.ecobankService.getToken().subscribe({
      next: response => {
        console.log('Ecobank:', response);
      },
      error: error => {
        console.error('Ecobank ERROR:', error);
      }
    });
  }
    */

  // pasar id del usuario asociado al viaje
  getTrips(user: any): void {




    this.nestjsService.getTrips(user).subscribe({
      next: (response) => {
        console.log(response);

        this.trips = response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });

  }
}
