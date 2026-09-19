import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcobankService {

  private authUrl =
    '/api/ecobank/corp-auth/api/v2/integration/auth/app/token';

  constructor(private http: HttpClient) { }

  /*
  pay(accessToken: string) {

    const url =
      '/api/ecobank/corp-directdebit/api/v2/integration/directdebit/payment';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Ocp-Apim-Subscription-Key': ''
    });

    const body = {
      headerRequest: {
        affiliateCode: 'EGH',
        clientId: 'CL001',
        sourceCode: 'CORP_CIB_MOBILE',
        requestId: `REQ${Date.now()}`,
        ipAddress: '192.168.1.1',
        requestType: 'DIRECT_DEBIT_PAYMENT',
        requestToken: 'TOKEN1234567890987654321'
      },
      secureHash: '3673982828778237634643',
      debitAccountNo: '1441002006858',
      amount: 5,
      currency: 'GHS',
      description: 'direct debit payment Transfer'
    };

    return this.http.post(url, body, { headers });
  }

  getToken() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Ocp-Apim-Subscription-Key': ''
    });

    const body = {
      headerRequest: {
        affiliateCode: 'EGH',
        clientId: 'CL001',
        sourceCode: 'CORP_CIB_MOBILE',
        requestId: 'REQ1234567890',
        ipAddress: '192.168.1.1',
        requestType: 'GET_API_TOKEN',
        requestToken: '05598c670eac118d33176bf03da74891f5154e4a089eac2923e1d982288c72de4c0e9b41157593d46d8232b04703c47a472fd22cbdbfa9c2de4d58127c8fbac0'
      },
      publicKey: 'corp_public_hdjhdhhhdhjdjhd',
      serviceCode: 'DOMESTIC',
      secureHash: '0fb17a7df02da3b0f877720178d2513889ce2860031332f2e6c3a7b36187757199b4cfdcf9ae479c9c1f57f0b9c2a0bf80ffd7854f2a2decdabf618657f66a75'
    };

    return this.http.post(this.authUrl, body, {
      headers
    });
  }
  */
}