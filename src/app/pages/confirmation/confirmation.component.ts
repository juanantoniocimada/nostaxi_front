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

  nestjsService = inject(NestJSService);
  router = inject(Router);

  trip = this.tripService.trip;

  driverData: any = null;
  tripData: any = null;

  departureIn: number | null = 0; 

  ngOnInit() {
    this.getTrip(157);
  }
  
  goToDriverTracking() {

    this.router.navigate(['/driver-tracking']);
  }
  
  getTrip(id: number) {
    this.nestjsService.getTrip(id).subscribe({
      next: (response) => {
        this.tripData = response;
        this.driverData = this.tripService.getAssignedDriver();
        
        
      },
      error: (error) => {
        console.error('Error fetching trip info:', error);
      }
    });
  }

}
