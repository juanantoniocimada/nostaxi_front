import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  // initialize signal from localStorage so value survives navigation/reloads
  userData = signal<any>(JSON.parse(localStorage.getItem('user') || 'null'));

  constructor() {
    console.log('User service constructed; initial user:', this.userData());
  }

  setUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
    this.userData.set(data);
  }

  getUserData() {
    return this.userData();
  }

  logout() {
    localStorage.removeItem('user');
    this.userData.set(null);
  }
  
}
