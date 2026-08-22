import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { Trip } from '../../services/trip';
import { NestJSService } from '../../services/nestjs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  providers: [],
  imports: [CommonModule, HeaderComponent],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationComponent implements OnInit {
  
  tripService = inject(Trip);
  trip = this.tripService.trip;
  nestjsService = inject(NestJSService);
  router = inject(Router);

  driverData: any = null;
  tripData: any = null;

  departureIn: number | null = 0;   // Sale ya
  // departureIn: 5;                // Sale en 5 min
  // departureIn: 10;               // Sale en 10 min

  ngOnInit() {
    console.log('Trip data:', this.trip());
    this.getDriver(5881441); 
    this.getTrip(157);
  }

  getDriver(id: number) {
    this.nestjsService.getDriver(id).subscribe({
      next: (response) => {

        console.log('Driver info:', response); 
        this.driverData = response.data;
      },
      error: (error) => {
        console.error('Error fetching driver info:', error);
      }
    });
  }
  
  goToDriverTracking() {
    // Navigate to the driver-tracking page
    // window.location.href = '/driver-tracking';

    this.router.navigate(['/driver-tracking']);
  }
  
  // 157
  getTrip(id: number) {
    this.nestjsService.getTrip(id).subscribe({
      next: (response) => {
        console.log('Trip info:', response);
        this.tripData = response;
      },
      error: (error) => {
        console.error('Error fetching trip info:', error);
      }
    });
  }

}
