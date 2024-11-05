import { Routes } from '@angular/router';
import { DetallesComponent } from './components/detalles/detalles.component';
import { IncioComponent } from './components/incio/incio.component';

export const routes: Routes = [
  { path: 'detalles', component: DetallesComponent},
  { path: 'inicio', component:  IncioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' }
];
