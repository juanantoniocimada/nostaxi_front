import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NestJSService } from './services/nestjs.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { busDivIcon, stopDisabledDivIcon, stopDivIcon, tileLayerUrl, userDivIcon } from './utils/map.utils';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MapComponent
  ],
  providers: [NestJSService],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  protected readonly title = signal('Nostaxi');

  tileLayerUrl = tileLayerUrl;
  bus = busDivIcon;
  stop = stopDivIcon;
  userDivIcon = userDivIcon;
  stopDisabled = stopDisabledDivIcon;
  routeColor = '#FF0000';
  vehicles: any = [];
  nestjsService = inject(NestJSService);

  latitude: number = 16.889925012664918;
  longitude: number = -24.987106709197644;

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
    this.getVehicles();
    
    this.mapComponent?.colocarBus(
      this.latitude ?? this.latitude,
      this.longitude ?? this.longitude,
    );


    setTimeout(() => {
      this.stops.forEach((el: any) => {
         this.mapComponent?.pintarParada(el);
      });

     this.mapComponent?.pintarRuta(this.stops);
    }, 0);
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

  lineClick($event: any) : void {}
}
