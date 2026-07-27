import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Trip {

  trip = signal<any>(null);

  setTrip(data: any) {
    this.trip.set(data);
  }

}
