import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Menu {

  menu = signal<any>(null);

  setMenu(data: any) {
    this.menu.set(data);
  }

}
