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

  private nestjsService = inject(NestJSService);
  private router = inject(Router);

  private pollingSubscription?: Subscription;
  tripService = inject(Trip);
  

  id: number = 0;

  ngOnInit(): void {
    this.createTrip();
  }
  
  createTrip() {

      // Example trip data structure
      const exampleTripData = {
          "deviceToken": "",
          "address": "123 Main St",
          "addressDestination": "456 Elm St",
          "driverName": "Davy",
          "plate": "1234",
          "pickupTime": "10:30",
          "confirmed": false,
          "latitude": 0.000000000000000,
          "longitude": 0.000000000000000,
      };

      this.nestjsService.confirmTrip(exampleTripData).subscribe({
        next: (response) => {

          console.log(response);
          

          this.id = response.data.id; // Assuming the response contains the trip ID

          this.tripService.setTrip({
            id: response.data.id,
          });
          
          console.log('Trip confirmed successfully:', response);
          alert('Viagem confirmada com sucesso!');

          // Push de prueba
          this.nestjsService.sendTestPush({
            token: 'eQK3CbK1SsC8FOXgINTR8G:APA91bEAEop4LuZqlNYF6rEor7xba8ncIBzR8_1oypLrcUIIrIGXFrQcPYQa48iOIO2GAhObkD0fChdhKbfl2ubeBHK6CiiqFBWGhW61XPJXr05OuyHV2EI',
            title: 'Teste de notificação',
            message: 'Esta é uma notificação de teste enviada do NestJSService.',
            id: this.id // Assuming the response contains the trip ID
          }).subscribe();

          this.startSearching(this.id); // Assuming the response contains the trip ID
        },
        error: (error) => {
          console.error('Error confirming trip:', error);
          alert('Ocorreu um erro ao confirmar a viagem. Por favor, tente novamente.');
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

          console.log('Estado viaje:', trip);

          if (trip?.data.confirmed) {

            console.log('Taxi aceptado', trip);

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
        }
      });

  }

  stopSearching() {
    this.pollingSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.stopSearching();
  }

}