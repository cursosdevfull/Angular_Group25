import { Routes } from '@angular/router';
import { PageCourse } from './components';
import { provideCourse } from './course.di';

export const courseRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PageCourse,
        providers: provideCourse(),
    },
];
