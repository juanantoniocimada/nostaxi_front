import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Loading } from '../../services/loading';
import { Router } from '@angular/router';
import { Menu } from '../../services/menu';
import { UserSignal } from '../../services/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  providers: [],
  imports: [
    CommonModule, 
    MatProgressBarModule,
    MatIconModule,
],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HeaderComponent implements OnInit {

  loading = inject(Loading);
  userService = inject(UserSignal);
  router = inject(Router);
  menu = inject(Menu)

  ngOnInit() {

  }

  get isLoading() {
    return this.loading.getLoading();
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  toggleMenu(): void {
    this.menu.toggleMenu();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
