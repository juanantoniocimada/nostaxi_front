import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./pages/confirmation/confirmation.component').then(m => m.ConfirmationComponent)
  },
  {
    path: 'searching',
    loadComponent: () => import('./pages/searching/searching').then(m => m.Searching)
  },
  {
    path: 'register-taxi',
    loadComponent: () => import('./pages/register-taxi/register-taxi.component').then(m => m.RegisterTaxiComponent)
  }
];
