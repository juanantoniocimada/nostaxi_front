import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NestJSService } from './services/nestjs.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from './components/map/map.component';
import { busDivIcon, stopDisabledDivIcon, stopDivIcon, tileLayerUrl, userDivIcon } from './utils/map.utils';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MapComponent
  ],
  providers: [NestJSService],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  tileLayerUrl = tileLayerUrl;
  bus = busDivIcon;
  stop = stopDivIcon;
  userDivIcon = userDivIcon;
  stopDisabled = stopDisabledDivIcon;
  routeColor = '#FF0000';
  vehicles: any = [];
  nestjsService = inject(NestJSService);

  address: string = '';

  latitude: number = 0;
  longitude: number = 0;
  hasLocation = false;
  locationWatchId: number | null = null;

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
          this.mapComponent?.colocarBus(this.latitude, this.longitude);
        }, 0);

        console.log('Latitud:', this.latitude);
        console.log('Longitud:', this.longitude);

        this.getAddressFromCoordinates(this.latitude, this.longitude)

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

  // https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json
  getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {

        console.log(data.display_name);
        
        this.address = data.display_name;

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
