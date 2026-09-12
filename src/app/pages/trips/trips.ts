import { Component, inject, OnInit } from '@angular/core';
import { NestJSService } from '../../services/nestjs.service';
import { HeaderComponent } from "../../components/header/header.component";
import { UserSignal } from '../../services/user';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-trips',
  imports: [HeaderComponent, MatCardModule],
  templateUrl: './trips.html',
  styleUrl: './trips.scss',
})
export class Trips implements OnInit {

  nestjsService = inject(NestJSService);
  userSignal = inject(UserSignal);

  trips :any= [];

  ngOnInit(): void {

    const user = this.userSignal.getUserData();

    this.getTrips(user);
  }

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
