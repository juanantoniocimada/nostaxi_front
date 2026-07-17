import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/register-taxi/register-taxi.component').then(m => m.RegisterTaxiComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./pages/confirmation/confirmation.component').then(m => m.ConfirmationComponent)
  },
  {
    path: 'register-taxi',
    loadComponent: () => import('./pages/register-taxi/register-taxi.component').then(m => m.RegisterTaxiComponent)
  }
];
