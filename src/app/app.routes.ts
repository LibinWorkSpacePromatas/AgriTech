import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'water-irrigation',
        loadComponent: () => import('./modules/water-irrigation/water-irrigation.component').then(m => m.WaterIrrigationComponent)
    },
    {
        path: 'profit-risk',
        loadComponent: () => import('./modules/profit-risk/profit-risk.component').then(m => m.ProfitRiskComponent)
    },
    {
        path: 'growing-opportunities',
        loadComponent: () => import('./modules/growing-opportunities/growing-opportunities.component').then(m => m.GrowingOpportunitiesComponent)
    },
    {
        path: 'grower-gpt',
        loadComponent: () => import('./modules/grower-gpt/grower-gpt.component').then(m => m.GrowerGptComponent)
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
