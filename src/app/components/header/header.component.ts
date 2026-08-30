import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Loading } from '../../services/loading';
import { User } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  providers: [],
  imports: [CommonModule, MatProgressBarModule],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HeaderComponent implements OnInit {

  loading = inject(Loading);
  userService = inject(User);
  router = inject(Router);

  ngOnInit() {

  }

  get isLoading() {
    return this.loading.getLoading();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
