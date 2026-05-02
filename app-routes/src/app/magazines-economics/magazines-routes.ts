import { Routes } from "@angular/router";

export const magazinesRoutes: Routes = [
    {
        path: "",
        // pathMatch: "full",
        // component: HomeMagazines,
        loadComponent: () => import("./home-magazines/home-magazines").then(m => m.HomeMagazines),
        children: [
            {
                path: "gestion",
                loadComponent: () => import("./gestion/gestion").then(m => m.Gestion)
            },
            {
                path: "rumbo-economico",
                loadComponent: () => import("./rumbo-economico/rumbo-economico").then(m => m.RumboEconomico)
            },
            {
                path: "semana-economica",
                // component: SemanaEconomica
                loadComponent: () => import("./semana-economica/semana-economica").then(m => m.SemanaEconomica)
            },
        ]
    },

    /* {
        path: "",
        redirectTo: "gestion",
        pathMatch: "full"
    } */

]