import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
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
    path: 'driver-tracking',
    loadComponent: () => import('./pages/driver-tracking/driver-tracking').then(m => m.DriverTracking)
  },
  {
    path: 'driver-register',
    loadComponent: () => import('./pages/driver-register/driver-register').then(m => m.DriverRegister)
  },
  {
    path: 'driver-register',
    loadComponent: () => import('./pages/driver-register/driver-register').then(m => m.DriverRegister)
  },
  {
    path: 'trips',
    loadComponent: () => import('./pages/trips/trips').then(m => m.Trips)
  },
{
  path: 'associated-business',
  loadComponent: () =>
    import('./pages/associated-business/associated-business')
      .then(m => m.AssociatedBusiness)
},
];
