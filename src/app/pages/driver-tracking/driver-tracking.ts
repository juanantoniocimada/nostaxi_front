import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { busDivIcon, destinationDivIcon, stopDisabledDivIcon, stopDivIcon, tileLayerUrl, userDivIcon } from '../../utils/map.utils';
import { MapComponent } from '../../components/map/map.component';
import { NestJSService } from '../../services/nestjs.service';
import { Subscription, interval } from 'rxjs';
import { Trip } from '../../services/trip';

@Component({
  selector: 'app-driver-tracking',
  imports: [MapComponent], // Add necessary imports here if needed
  templateUrl: './driver-tracking.html',
  styleUrls: ['./driver-tracking.scss'],
})
export class DriverTracking implements OnInit {

  constructor(private nestJSService: NestJSService) {}
  tripService = inject(Trip);

  @ViewChild(MapComponent) mapComponent?: MapComponent;

  tileLayerUrl = tileLayerUrl;
  bus = busDivIcon;
  destination: any = destinationDivIcon;
  stop = stopDivIcon;
  userDivIcon = userDivIcon;
  stopDisabled = stopDisabledDivIcon;

  hasLocation = true;

  departureIn: number = 0;

  latitude: number = 0;
  longitude: number = 0;

  latitudeDestination: number = 0;
  longitudeDestination: number = 0;

  routeColor = '#FF0000';

  locationPolling?: Subscription;

  idTrip: number = 0;

  ngOnInit(): void {

    this.latitude = 16.892591887181208;
    this.longitude = -24.985956340660707;

    this.idTrip = this.tripService.trip()?.id || 0;


    setTimeout(() => {
      this.colocarBus(this.latitude, this.longitude);
    }, 0);

 this.locationPolling = interval(5000)
    .subscribe(() => {
      this.getTaxiPosition(this.idTrip); // Replace 1 with the actual taxi ID as needed
    });

  }

  stopClick($event: any): void {
    const html = `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="font-weight: bold;">${$event.name}</div>
      </div>
    `;

    this.mapComponent?.openStopPopupDesdeFuera(html, $event, []);
  }

  lineClick($event: any): void { }

  mapClick($event: any): void {

  }

  colocarBus(lat: number, lon: number): void {
    this.mapComponent?.colocarBus(lat, lon);
  }

getTaxiPosition(id: number): void {

  this.nestJSService.getTripLastLocation(id)
    .subscribe({
      next: (position) => {

        this.latitude = position.latitude;
        this.longitude = position.longitude;

        this.colocarBus(
          this.latitude,
          this.longitude
        );

      },
      error: (error) => {
        console.error(
          'Error obteniendo posición taxi',
          error
        );
      }
    });

}
  
}
