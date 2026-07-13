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
import { MatMenu, MatMenuModule } from '@angular/material/menu';

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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  tileLayerUrl = tileLayerUrl;
  bus = busDivIcon;
  destination: any = destinationDivIcon;
  stop = stopDivIcon;
  userDivIcon = userDivIcon;
  stopDisabled = stopDisabledDivIcon;

  router = inject(Router);

  routeColor = '#FF0000';
  vehicles: any = [];
  nestjsService = inject(NestJSService);

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

  stops: any = [
    {
      id_locations: 1,
      name: 'Stop 1',
      coords: [16.889925012664918, -24.987106709197644],
      show2: true,
      popup: true
    },
    {
      id_locations: 2,
      name: 'Stop 2',
      coords: [16.879357915679513, -24.976183333588956],
      show2: true,
      popup: true
    }
  ];

  ngOnInit() {

    this.getLocation()
  }

  ngAfterViewInit() {
    // this.getVehicles();

    // setTimeout(() => {
    // this.stops.forEach((el: any) => {
    // this.mapComponent?.pintarParada(el);
    //   });

    // this.mapComponent?.pintarRuta(this.stops);
    //  }, 10);
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

  ngOnDestroy(): void {
    if (this.locationWatchId !== null) {
      navigator.geolocation.clearWatch(this.locationWatchId);
      this.locationWatchId = null;
    }
  }

  goToConfirmation() {
    this.router.navigate(['/confirmation']);
  }

  getAddressFromCoordinates(lat: number, lng: number, isDestination: boolean = false): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {

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

  getVehicles() {
    this.nestjsService.getVehicles().subscribe({
      next: (data) => {
        console.log('Vehicles:', data);
        this.vehicles = data['data'];
        console.log(this.vehicles);

      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
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
    }, 1000);

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
}
