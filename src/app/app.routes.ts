import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IncioComponent } from './components/incio/incio.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component:  IncioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
