import { Routes } from '@angular/router';
import { PageLogin } from './components';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageLogin,
  },
];
