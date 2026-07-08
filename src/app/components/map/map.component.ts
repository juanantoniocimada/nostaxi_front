import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  providers: [],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() center = [0, 0];
  @Input() mapTileUrl = '';
  @Input() routeColor = ''
  @Input() user = {};
  @Input() bus = {};
  @Input() stop? = {};
  @Input() stopDisabled? = {};

  @Output() stopClick = new EventEmitter<any>();
  @Output() lineClick = new EventEmitter<any>();

  markersByStopId = new Map<number, L.Marker>()

  mapContainer!: HTMLElement;
  tileLayer!: L.TileLayer;

  map!: L.Map;
  userMarker: L.Marker | undefined;
  busMarker: L.Marker | undefined;

  tilesLoaded = 0;
  totalTiles = 0;
  watchId: string | null = null;

  get routeStyles() {
    return [
      {
        color: this.routeColor,
        weight: 6,
        opacity: 1,
      }
    ];
  }

  get routeLineOptions() {
    return {
      styles: this.routeStyles,
      extendToWaypoints: false,
      missingRouteTolerance: 0,
    };
  }


  ngOnInit() {
    this.initializeMap();
  }

  async initializeMap() {

    const zoom = 13;
    const zoomControl = false;

    this.creationMap(zoom, zoomControl);
  }

  creationMap(zoom: number, zoomControl: boolean) {


    this.map = L.map('map', {
      center: [this.center[0], this.center[1]
      ],
      zoom: zoom,
      zoomControl: zoomControl,
    });

    if (this.map !== undefined) {
      this.configMap()
    }
  }

  showMap() {

    if (this.map) {

      setTimeout(() => {
        const routingContainer = document.querySelector('.leaflet-routing-container') as HTMLElement;

        if (routingContainer) {
          routingContainer.style.display = 'none'; // Ocultar el panel
        }
      }, 10);

      this.mapContainer = document.getElementById('map')!;

      if (this.mapContainer) {
        this.mapContainer.style.opacity = '1'; // show el mapa
      }
    }
  }

  buildRoutingControlOptions(waypoints: L.LatLng[]) {
    const plan = L.Routing.plan(waypoints, {
      routeWhileDragging: true,
      createMarker: () => false,
      addWaypoints: true,
    });

    return {
      plan,
      waypoints,
      routeWhileDragging: false,
      lineOptions: this.routeLineOptions,
    };
  }

  createIonIconDivIcon(item: any): L.DivIcon {
    return L.divIcon({
      className: item.className,
      html: item.html,
      iconSize: item.iconSize,
      iconAnchor: item.iconAnchor,
    });
  }

  configMap() {

    setTimeout(() => {
      this.map.invalidateSize();
      this.calculateTotalTiles();
    }, 10);

    this.tileLayer = L.tileLayer(this.mapTileUrl).addTo(this.map);
    this.tileLayer.on('tileload', () => {

      this.tilesLoaded++;

      if (this.tilesLoaded === this.totalTiles) {
        this.showMap();
      }
    });
  }

  pintarParada(el: any) {

    this.mapContainer = document.getElementById('map')!;
    if (this.mapContainer) {
      this.mapContainer.style.opacity = '0';

      const show = el.show2;

      const icono = L.marker(el.coords, {
        icon: show ? this.createIonIconDivIcon(this.stop) : this.createIonIconDivIcon(this.stopDisabled),
      });

      icono.addTo(this.map);

      if (el.popup) {
        this.asignarPopup(el, el.id_locations, icono);
      }
    }
  }

  asignarPopup(el: any, id: any = null, icono: L.Marker): void {

    this.markersByStopId.set(id, icono);

    icono.on('click', () => {
      icono.bindPopup('Cargando...');
      icono.openPopup();
      this.stopClick.emit(el);
    });
  }

  pintarRuta(stops: any[]) {
    const waypoints = stops?.map((stop: any) => L.latLng(stop.coords)) ?? [];
    L.Routing.control(this.buildRoutingControlOptions(waypoints)).addTo(this.map);
  }

  openStopPopupDesdeFuera(html: string, stop: any, data: any[]): void {

    const marker = this.markersByStopId.get(stop.id_locations);
    if (!marker) return;

    marker.setPopupContent(html);
    marker.openPopup();
    this.logicaAccionesBotonesPopup(marker, stop, data);
  }

  logicaAccionesBotonesPopup(marker: L.Marker, stop: any, data: any[]): void {
    setTimeout(() => {
      const popupElement = marker.getPopup()?.getElement();
      if (!popupElement) return;

      popupElement.querySelectorAll<HTMLElement>('[data-line-index]').forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();

          const lineIndex = Number(button.dataset['lineIndex']);
          const line = data?.[lineIndex];

          if (!line) return;

          this.lineClick.emit({ stop, line });
        };
      });
    }, 10);
  }

  moveMarkerSmoothly(marker: L.Marker, toLat: number, toLng: number, durationMs = 600): void {
    const from = marker.getLatLng();
    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      marker.setLatLng([
        from.lat + (toLat - from.lat) * t,
        from.lng + (toLng - from.lng) * t,
      ]);
      if (t < 1) requestAnimationFrame(animate);
    };


    requestAnimationFrame(animate);
  }

  colocarUser(latitude: number, longitude: number) {
    if (this.userMarker) {
      this.moveMarkerSmoothly(this.userMarker, latitude, longitude);
    } else {
      this.userMarker = L.marker([latitude, longitude], { icon: this.createIonIconDivIcon(this.user) })
        .addTo(this.map);

      // this.asignarPopup({ coords: [latitude, longitude] }, null, this.userMarker);      

    }
  }

  colocarBus(latitude: number, longitude: number) {
    if (this.busMarker) {
      this.moveMarkerSmoothly(this.busMarker, latitude, longitude);
    } else {
      this.busMarker = L.marker([latitude, longitude],
        { icon: this.createIonIconDivIcon(this.bus) })
        .addTo(this.map);
    }
  }

  calculateTotalTiles() {
    const bounds = this.map!.getBounds();
    const zoom = this.map!.getZoom();
    const topLeft = this.map!.project(bounds.getNorthWest(), zoom);
    const bottomRight = this.map!.project(bounds.getSouthEast(), zoom);
    const size = bottomRight.subtract(topLeft);
    const tileSize = 256; // Tamaño de los tiles

    this.totalTiles = Math.ceil(size.x / tileSize) * Math.ceil(size.y / tileSize);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
