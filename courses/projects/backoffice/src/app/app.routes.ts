import { Routes } from '@angular/router';
import { Layout } from './core/components/layout/layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: "layout",
    component: Layout,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
      },
      {
        path: 'users',
        loadChildren: () => import('./features/user/user.routes').then((m) => m.userRoutes),
      },
      {
        path: 'courses',
        loadChildren: () => import('./features/course/course.routes').then((m) => m.courseRoutes),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
