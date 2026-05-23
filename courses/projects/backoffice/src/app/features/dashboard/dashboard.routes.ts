import { Routes } from '@angular/router';
import { PageDashboard } from './components';

export const dashboardRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PageDashboard,
    },
];
