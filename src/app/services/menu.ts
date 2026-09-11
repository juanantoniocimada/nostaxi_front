import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Menu {

  showMenu = signal(false);

  toggleMenu(): void {
    this.showMenu.update(value => !value);
  }
}
