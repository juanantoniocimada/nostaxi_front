import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { Trip } from '../../services/trip';
import { NestJSService } from '../../services/nestjs.service';

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
  
  ngOnInit() {
    console.log('Trip data:', this.trip());
  }

  confirm() {
    const tripData = this.trip();

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

    if (tripData) {
      this.nestjsService.confirmTrip(exampleTripData).subscribe({
        next: (response) => {
          console.log('Trip confirmed successfully:', response);
          alert('Viagem confirmada com sucesso!');
        },
        error: (error) => {
          console.error('Error confirming trip:', error);
          alert('Ocorreu um erro ao confirmar a viagem. Por favor, tente novamente.');
        }
      });
    } else {
      console.error('No trip data available to confirm.');
      alert('Não há dados de viagem disponíveis para confirmar.');
    }  
  }
}
