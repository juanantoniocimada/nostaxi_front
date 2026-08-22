import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Trip {

  trip = signal<any>(null);

  getTrip() {
    return this.trip();
  }

  setTrip(data: any) {

    console.log('Setting trip data:', data);

    this.trip.set(data);
  }

}
