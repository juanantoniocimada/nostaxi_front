

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

  registerTaxi(data: any): Observable<any> {
    const url = `${this._apiUrl}/register-taxi`;
    return this._http.post(url, data);
  }
}
