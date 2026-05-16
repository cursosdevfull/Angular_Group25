import { Routes } from '@angular/router';
import { PageLogin } from './components';
import { provideAuth } from './auth.di';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageLogin,
    providers: provideAuth(),
  },
];
