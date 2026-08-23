import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
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
import { Google } from '../../services/google';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { MatMenuModule } from '@angular/material/menu';
import { Trip } from '../../services/trip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Overpass } from '../../services/overpass';
import { Nominatim } from '../../services/nominatim';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
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
    HeaderComponent,
    MatAutocompleteModule
  ],
  providers: [NestJSService, Overpass, Nominatim, Google],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(MapComponent) mapComponent?: MapComponent;
  
  errorMessages: string[] = [
    
  ];

  router = inject(Router);
  nestjsService = inject(NestJSService);
  tripService = inject(Trip);
  overpassService = inject(Overpass);
  nominatimService = inject(Nominatim);
  placesService = inject(Google);

  tileLayerUrl = tileLayerUrl;
  bus = busDivIcon;
  destination: any = destinationDivIcon;
  stop = stopDivIcon;
  userDivIcon = userDivIcon;
  stopDisabled = stopDisabledDivIcon;

  loadingDestinationSuggestions = false;

  routeColor = 'blue';

  destinationSuggestions: any[] = [];

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
  destinationSearchTimeout: any;

  ngOnInit() {
    this.getLocation()
  }

  getLocation() {
    if (this.locationWatchId !== null) {
      return;
    }

    if (!navigator.geolocation) {
      this.errorMessages.push('El navegador no soporta geolocalización');
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

        this.getAddressFromCoordinates(this.latitude, this.longitude);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error.message);
        this.errorMessages.push('Error obteniendo ubicación:');
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
      addressDestination: this.addressDestination ? this.addressDestination : '',
      userOriginPosName: this.address,
      userOriginPosLat: this.latitude,
      userOriginPosLng: this.longitude,
      userDestinationPosName: this.addressDestination,
      userDestinationPosLat: this.latitudeDestination,
      userDestinationPosLng: this.longitudeDestination,
      pickupTime: this.pickupTime,
      id: 0,
    });

    this.router.navigate(['/searching']);
  }

  getAddressFromCoordinates(lat: number, lng: number): void {
    this.nominatimService.getAddressFromCoordinates(lat, lng)
      .then(address => {
        this.address = address;
      })
      .catch(error => {
        console.error('Error obteniendo dirección desde Nominatim:', error);
        this.errorMessages.push('Error obteniendo dirección desde Nominatim: ');
      });
  }

  goToRegisterTaxi() {
    this.router.navigate(['/register-taxi']);
  }

  buildRoute(
    latitude: number,
    longitude: number
  ) {
    this.mapComponent?.colocarDestination(latitude, longitude);

    const ruta = [
      [this.latitude, this.longitude],
      [latitude, longitude]
    ];

    setTimeout(() => {
      this.mapComponent?.pintarRuta(ruta);
    }, 0);

    this.latitudeDestination = latitude;
    this.longitudeDestination = longitude;

  }

  mapClick($event: any): void {

    this.buildRoute($event.latitude, $event.longitude);
    this.getAddressFromCoordinates($event.latitude, $event.longitude);
  }

  onDestinationInput(event: any): void {

    const text = (event.target as HTMLInputElement)
    .value
    .toLowerCase()
    .trim();

    clearTimeout(this.destinationSearchTimeout);

    if (text.length < 3) {
      this.destinationSuggestions = [];
      this.loadingDestinationSuggestions = false;
      return;
    }

    this.loadingDestinationSuggestions = true;

    this.destinationSearchTimeout = setTimeout(() => {
      this.searchPlacesGoogle(text);
    }, 500);
  }

  getPlaceLocation(suggestion: any): void {

    const placeId = suggestion?.placePrediction?.placeId;
    this.placesService.getPlaceLocation(placeId)
      .subscribe((response: any) => {

        const lat = response?.location?.latitude;
        const lng = response?.location?.longitude;

        
        this.addressDestination = suggestion?.placePrediction?.text?.text || '';
        this.latitudeDestination = lat;
        this.longitudeDestination = lng

        this.buildRoute(lat, lng);

      }, (error: any) => {
        console.error('Error obteniendo las coordenadas:', error);
      });

  }  

  searchPlacesGoogle(text: string): void {


    this.placesService.searchPlaces(text)
      .subscribe((response: any) => {
        this.loadingDestinationSuggestions = false;

        const suggestions = Array.isArray(response?.suggestions)
          ? response.suggestions
          : [];

        this.destinationSuggestions = suggestions.map((item: any) => ({
          placePrediction: {
            place: item?.placePrediction?.place,
            placeId: item?.placePrediction?.placeId,
            text: {
              text: item?.placePrediction?.text?.text || '',
              matches: item?.placePrediction?.text?.matches || [],
            },
          },
        }));
      }, (error: any) => {
        console.error('Error al buscar lugares en Google Places:', error);
        this.errorMessages.push('Error al buscar lugares en Google Places: ');
        this.loadingDestinationSuggestions = false;
      });

  }

  searchPlacesOverpass(text: string): void {

    this.loadingDestinationSuggestions = true;
    
    this.overpassService.searchPlaces(text)
      .then(response => response.json())
      .then(data => {

        this.loadingDestinationSuggestions = false;

        this.destinationSuggestions = data.elements;

        this.destinationSuggestions = this.destinationSuggestions.filter(place =>
          place.tags && place.tags.name && place.tags.name.toLowerCase().includes(text)
        );
      })
      .catch(error => {
        console.error('Error al buscar lugares en Overpass:', error);
        this.errorMessages.push('Error al buscar lugares en Overpass: ');
      })
      .finally(() => {
        this.loadingDestinationSuggestions = false;
      });
  }

  stopClick($event: any): void {

  }
  
  lineClick($event: any): void { }

  selectDestination(suggestion: any): void {
    this.getPlaceLocation(suggestion);
  }

  ngOnDestroy(): void {
    if (this.locationWatchId !== null) {
      navigator.geolocation.clearWatch(this.locationWatchId);
      this.locationWatchId = null;
    }
  }
}
