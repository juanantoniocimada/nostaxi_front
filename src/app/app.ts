import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NestJSService } from './services/nestjs.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Menu } from './services/menu';
import { MatMenuModule } from "@angular/material/menu";
import { UserSignal } from './services/user';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule
],
  providers: [NestJSService],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  router = inject(Router);
  menu = inject(Menu);
  userService = inject(UserSignal);

  logout(): void {
    this.userService.logout();
    this.menu.toggleMenu();
    this.router.navigate(['/'])
  }

  goTo(route: string): void {
    this.menu.toggleMenu();
    this.router.navigate([route]);
  }
}
