import { Routes } from '@angular/router';
import { ChicagoNews } from './chicago-news/chicago-news';
import { Home } from './home/home';
import { NewYorkTimes } from './new-york-times/new-york-times';
import { Politics } from './politics/politics';
import { Sports } from './sports/sports';
import { WashingtonPost } from './washington-post/washington-post';

export const routes: Routes = [
    {
        path: "home",
        component: Home
    },
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
        //component: Base
    },
    {
        path: "economics",
        loadComponent: () => import("./economics/economics").then(m => m.Economics)
        //component: Economics
    },
    {
        path: "politics",
        component: Politics
    },
    {
        path: "sports",
        component: Sports
    },
    {
        path: "magazines",
        children: [
            {
                path: "angeles",
                loadComponent: () => import("./angeles-post/angeles-post").then(m => m.AngelesPost)
            },
            {
                path: "chicago",
                component: ChicagoNews
            },
            {
                path: "new-york",
                component: NewYorkTimes
            },
            {
                path: "washington",
                component: WashingtonPost
            }
        ]
    },
    {
        path: "magazines-economics",
        loadChildren: () => import("./magazines-economics/magazines-routes").then(m => m.magazinesRoutes)
    }
];
