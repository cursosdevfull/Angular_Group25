import { Routes } from '@angular/router';
import { PageCourse } from './components';

export const courseRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PageCourse,
    },
];
