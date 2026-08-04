import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NestJSService } from '../../services/nestjs.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../../components/map/map.component';
import { busDivIcon, destinationDivIcon, stopDisabledDivIcon, stopDivIcon, tileLayerUrl, userDivIcon } from '../../utils/map.utils';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ConfirmationComponent } from "../confirmation/confirmation.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MatMenuModule } from '@angular/material/menu';
import { Trip } from '../../services/trip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MapComponent,
    MatMenuModule,
    FormsModule,
    ConfirmationComponent,
    HeaderComponent
],
  providers: [NestJSService],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  tileLayerUrl = tileLayerUrl;
  bus = busDivIcon;
  destination: any = destinationDivIcon;
  stop = stopDivIcon;
  userDivIcon = userDivIcon;
  stopDisabled = stopDisabledDivIcon;

  router = inject(Router);

  routeColor = 'blue';
  
  nestjsService = inject(NestJSService);
  tripService = inject(Trip);


  debugMode = false;
  showSelects = true;

  address: string = '';
  addressDestination: string = '';

  latitude: number = 0;
  longitude: number = 0;

  latitudeDestination: number = 0;
  longitudeDestination: number = 0;

  hasLocation = false;
  locationWatchId: number | null = null;

  pickupTime = new Date().toTimeString().slice(0, 5);

  ngOnInit() {
    this.getLocation()
  }

  getLocation() {
    if (this.locationWatchId !== null) {
      return;
    }

    if (!navigator.geolocation) {
      console.error('El navegador no soporta geolocalización');
      return;
    }

    this.locationWatchId = navigator.geolocation.watchPosition(
      (position) => {

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.hasLocation = true;

        setTimeout(() => {
          this.mapComponent?.colocarUser(this.latitude, this.longitude);
        }, 0);

        this.getAddressFromCoordinates(this.latitude, this.longitude, false)

      },
      (error) => {
        console.error('Error obteniendo ubicación:', error.message);
      },
      {
        enableHighAccuracy: true, // intenta usar GPS si está disponible
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  search() {
    this.tripService.setTrip({
      address: this.address,
      addressDestination: this.addressDestination,
      pickupTime: this.pickupTime,
      id: 0,
    });

    this.router.navigate(['/searching']);
  }

  getAddressFromCoordinates(lat: number, lng: number, isDestination: boolean = false): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {

        console.log(data.address); 
        console.log(this.longitudeDestination);
        console.log(this.latitudeDestination);  

        if (isDestination) {
          this.addressDestination = data.display_name;
        } else {
         this.address = data.display_name;
        }


        if (data && data.display_name) {
          return data.display_name;
        } else {
          throw new Error('No se pudo obtener la dirección');
        }
      })
      .catch(error => {
        console.error('Error al obtener la dirección:', error);
        throw error;
      });
  }

  goToRegisterTaxi() {
    this.router.navigate(['/register-taxi']);
  }

  mapClick($event: any): void {
    console.log('Map clicked at:', $event);
    
    this.mapComponent?.colocarDestination($event.latitude, $event.longitude);

    const ruta = [
      [this.latitude, this.longitude],
      [$event.latitude, $event.longitude ]
    ];

    setTimeout(() => {
      this.mapComponent?.pintarRuta(ruta);
    }, 0);

    this.getAddressFromCoordinates($event.latitude, $event.longitude, true)
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

  ngOnDestroy(): void {
    if (this.locationWatchId !== null) {
      navigator.geolocation.clearWatch(this.locationWatchId);
      this.locationWatchId = null;
    }
  }
}
