import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Nominatim {

  getAddressFromCoordinates(
    lat: number,
    lng: number
  ): Promise<string> {

    const url =
      `https://nominatim.openstreetmap.org/reverse` +
      `?lat=${lat}` +
      `&lon=${lng}` +
      `&format=json`;

    return fetch(url)
      .then(response => {

        if (!response.ok) {
          throw new Error(
            `Nominatim error: ${response.status}`
          );
        }

        return response.json();
      })
      .then(data => {

        if (data?.display_name) {
          return data.display_name;
        }

        throw new Error(
          'No se pudo obtener la dirección'
        );
      });
  }

}
