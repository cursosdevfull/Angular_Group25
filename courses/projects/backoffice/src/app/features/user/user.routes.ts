import { Routes } from '@angular/router';
import { PageUser } from './components';

export const userRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PageUser,
    },
];
