import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  userData = signal<any>(null);

  setUserData(data: any) {
    this.userData.set(data);
  }

  getUserData() {
    return this.userData();
  }
  
}
