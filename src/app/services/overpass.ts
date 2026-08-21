import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Overpass {

  private readonly url = 'https://overpass-api.de/api/interpreter';

  searchPlaces(text: string): Promise<any> {

    const query = `
      [out:json][timeout:15];

      nwr(16.80,-25.10,16.95,-24.85)
        ["name"~"${text.replace(/"/g, '\\"')}",i];

      out center 20;
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
