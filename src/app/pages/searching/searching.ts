import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { interval, Subscription, switchMap, takeWhile } from 'rxjs';
import { NestJSService } from '../../services/nestjs.service';
import { Router } from '@angular/router';

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


  ngOnInit(): void {
    this.createTrip();
  }

  
  createTrip() {

      // Example trip data structure
      const exampleTripData = {
          "deviceToken": "cE6z18JbR4G08_QONTFeMm:APA91bGzEIOP1lxWZM0VV9QO6G1YjgexlxK8bcrY58wwXAI-8_nbwzHJ0fG3Hl_uBG_sWbVc3cmnotBWypa3_dNU1XnA0oOUfyLsDx9yx2yc9wgCtG48hCI",
          "address": "123 Main St",
          "addressDestination": "456 Elm St",
          "driverName": "Davy",
          "plate": "1234",
          "pickupTime": "10:30",
          "confirmed": false
      };
      
      this.nestjsService.confirmTrip(exampleTripData).subscribe({
        next: (response) => {
          console.log('Trip confirmed successfully:', response);
          alert('Viagem confirmada com sucesso!');

          // Push de prueba
          this.nestjsService.sendTestPush({
            token: 'cfVFpyi1SuiVD1eMVYVWeU:APA91bHeYqiD6zvJmaJAPErKu4rHcvGHK-6Vusl-odELSQqN5Xmudw0lArkpE3qtEE-S4Iervr3sugXWm_HraWa0-slbg2GXIwqSmy6HeZyU4qok8MjdLs4',
            title: 'Teste de notificação',
            message: 'Esta é uma notificação de teste enviada do NestJSService.',
            id: response.data.id // Assuming the response contains the trip ID
          }).subscribe();

          this.startSearching(response.data.id); // Assuming the response contains the trip ID
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