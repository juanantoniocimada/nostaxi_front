import { Component, inject, OnInit } from '@angular/core';
import { NestJSService } from '../../services/nestjs.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-trips',
  imports: [HeaderComponent],
  templateUrl: './trips.html',
  styleUrl: './trips.scss',
})
export class Trips implements OnInit {

  nestjsService = inject(NestJSService);


  trips :any= [];

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.nestjsService.getTrips().subscribe({
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
