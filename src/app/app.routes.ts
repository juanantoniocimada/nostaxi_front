import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./pages/confirmation/confirmation.component').then(m => m.ConfirmationComponent)
  },
];
