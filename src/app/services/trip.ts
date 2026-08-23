import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Trip {

  trip = signal<any>(null);
  assignedDriver = signal<any>(null);

  getTrip() {
    return this.trip();
  }

  setTrip(data: any) {
    this.trip.set(data);
  }

  setAssignedDriver(data: any) {
    this.assignedDriver.set(data);
  }

  getAssignedDriver() {
    return this.assignedDriver();
  }

}
