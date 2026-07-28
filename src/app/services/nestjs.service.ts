

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NestJSService {

  private _apiUrl = window.location.hostname === 'localhost'
    ? environment.nestJsLocal || environment.nestJsLocal
    : environment.nestJsLocal;
  private _http = inject(HttpClient);

  getVehicles(): Observable<any> {
    const url = `${this._apiUrl}/vehicles`;
    return this._http.get(url)
  }

  registerTaxiInterest(data: any): Observable<any> {
    const url = `${this._apiUrl}/taxi-interest`;
    return this._http.post(url, data);
  }

  confirmTrip(data: any): Observable<any> {
    const url = `${this._apiUrl}/trips`;
    return this._http.post(url, data);
  }

  sendTestPush(data: {
    token: string;
    title?: string;
    message?: string;
    id?: number;
  }): Observable<any> {

    const url = `${this._apiUrl}/push/test`;

    return this._http.post(url, data);
  }

  checkTripStatus(id: number): Observable<{ confirmed: boolean }> {
    const url = `${this._apiUrl}/trips/status/${id}`;
    return this._http.get<{ confirmed: boolean }>(url);
  }

}
