import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Overpass {

  private readonly url = 'https://overpass-api.de/api/interpreter';

  searchPlaces(text: string): Promise<any> {

    const query = `
    [out:json][timeout:60];

    nwr(16.80,-25.10,16.95,-24.85)
      ["name"~"${text}",i];

    out center;
  `;

    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        data: query
      })
    });
  }

}
