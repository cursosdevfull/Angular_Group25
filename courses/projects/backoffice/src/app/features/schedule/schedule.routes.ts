import { Routes } from '@angular/router';
import { PageSchedule } from './components';
import { provideSchedule } from './schedule.di';

export const scheduleRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PageSchedule,
        providers: provideSchedule(),
    },
];