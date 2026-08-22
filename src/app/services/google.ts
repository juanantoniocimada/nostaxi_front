import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Google {

  private readonly url =
    'https://places.googleapis.com/v1/places:autocomplete';

  private readonly apiKey = '';

  constructor(private http: HttpClient) { }

  searchPlaces(text: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': this.apiKey,
      'X-Goog-FieldMask':
        'suggestions.placePrediction.place,' +
        'suggestions.placePrediction.placeId,' +
        'suggestions.placePrediction.text'
    });

    const body = {
      input: text,
      includedRegionCodes: ['cv'],
      locationRestriction: {
        rectangle: {
          low: {
            latitude: 16.80,
            longitude: -25.10
          },
          high: {
            latitude: 16.95,
            longitude: -24.85
          }
        }
      }
    };

    return this.http.post(this.url, body, { headers });
  }

  getPlaceLocation(placeId: string) {

    const headers = new HttpHeaders({
      'X-Goog-Api-Key': this.apiKey,
      'X-Goog-FieldMask': 'location'
    });

    return this.http.get(
      `https://places.googleapis.com/v1/places/${placeId}`,
      { headers }
    );
  }

}
