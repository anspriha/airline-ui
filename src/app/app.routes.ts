import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },

  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
  },
  { path: 'searchflight', loadComponent: () => import('./searchflight/searchflight.component').then(m => m.SearchflightComponent) },

  { path: 'bookFlight', loadComponent: () => import('./bookflight/bookflight.component').then(m => m.BookFlightComponent) },
   
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }, // Fallback route for invalid paths
   ];