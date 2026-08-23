import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { interval, Subscription, switchMap, takeWhile } from 'rxjs';
import { NestJSService } from '../../services/nestjs.service';
import { Router } from '@angular/router';
import { Trip } from '../../services/trip';

@Component({
  selector: 'app-searching',
  imports: [],
  templateUrl: './searching.html',
  styleUrls: ['./searching.scss'],
})
export class Searching implements OnInit, OnDestroy {

  nestjsService = inject(NestJSService);
  router = inject(Router);
  tripService = inject(Trip);
  pollingSubscription?: Subscription;
  token = '';
  id: number = 0;

  ngOnInit(): void {
    this.getAssignedDriver(5881441);
  }

  async createTrip(driverData: any) {

    this.token = driverData.pushToken;

    const tripData = await this.tripService.getTrip();
    const assignedDriver = driverData;

    this.tripService.setAssignedDriver(assignedDriver);

    console.log('Assigned driver data:', assignedDriver);

    console.log('Trip data in createTrip:', tripData);

    /*
    borrar estos campos

    "deviceToken": "",
    "address": "123 Main St",
    "addressDestination": "456 Elm St",
    "driverName": "Davy",
    "plate": "1234",
    "pickupTime": "10:30",
    "latitude": 0.000000000000000,
    "longitude": 0.000000000000000,
    */

    // Example trip data structure
    const exampleTripData = {
      "deviceToken": "",
      "address": "123 Main St",
      "addressDestination": "456 Elm St",
      "driverName": "Davy",
      "plate": "1234",
      "pickupTime": "10:30",
      "latitude": 0.000000000000000,
      "longitude": 0.000000000000000,
      "userOriginPosName": tripData?.userOriginPosName,
      "userOriginPosLat": tripData?.userOriginPosLat,
      "userOriginPosLng": tripData?.userOriginPosLng,
      "userDestinationPosName": tripData?.userDestinationPosName,
      "userDestinationPosLat": tripData?.userDestinationPosLat,
      "userDestinationPosLng": tripData?.userDestinationPosLng,
      "confirmed": false
    };

    this.nestjsService.confirmTrip(exampleTripData).subscribe({
      next: (response) => {

        this.id = response.data.id; // Assuming the response contains the trip ID

        const currentTrip = this.tripService.getTrip();

        this.tripService.setTrip({
          ...currentTrip,
          id: response.data.id,
        });

        // Push de prueba
        this.nestjsService.sendTestPush({
          token: this.token,
          title: 'Teste de notificação',
          message: 'Esta é uma notificação de teste enviada do NestJSService.',
          id: this.id // Assuming the response contains the trip ID
        }).subscribe();

        this.startSearching(this.id); // Assuming the response contains the trip ID
      },
      error: (error) => {
        console.error('Error confirming trip:', error);
        this.cancel();
      }
    });
  }
  // conseguir driver asignado  
  getAssignedDriver(id: number) {
    this.nestjsService.getAssignedDriver(id).subscribe({
      next: (response) => {
        this.createTrip(response.data);
      },
      error: (error) => {
        console.error('Error fetching driver info:', error);
        this.cancel();
      }
    });
  }

  startSearching(tripId: number) {

    // const tripId = 1; // Replace with the actual trip ID you want to check
    this.pollingSubscription = interval(5000)
      .pipe(
        switchMap(() => this.nestjsService.checkTripStatus(tripId)),
        takeWhile((trip) => !trip.confirmed, true)
      )
      .subscribe({
        next: (trip: any) => {

          if (trip?.data.confirmed) {

            this.router.navigate([
              '/confirmation'
            ], {
              state: trip
            });

            this.stopSearching();
          }

        },
        error: (err) => {
          console.error('Error buscando taxi', err);
          this.cancel();
        }
      });
  }

  cancel() {
    this.stopSearching();
    this.router.navigate(['/home']);
  }

  stopSearching() {
    this.pollingSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.stopSearching();
  }

}