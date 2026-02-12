import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/select-user',
        pathMatch: 'full'
    },
    {
        path: 'select-user',
        loadComponent: () => import('./modules/user-selection/user-selection.component').then(m => m.UserSelectionComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'water-irrigation',
        loadComponent: () => import('./modules/water-irrigation/water-irrigation.component').then(m => m.WaterIrrigationComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profit-risk',
        loadComponent: () => import('./modules/profit-risk/profit-risk.component').then(m => m.ProfitRiskComponent),
        canActivate: [authGuard]
    },
    {
        path: 'growing-opportunities',
        loadComponent: () => import('./modules/growing-opportunities/growing-opportunities.component').then(m => m.GrowingOpportunitiesComponent),
        canActivate: [authGuard]
    },
    {
        path: 'grower-gpt',
        loadComponent: () => import('./modules/grower-gpt/grower-gpt.component').then(m => m.GrowerGptComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: '/select-user'
    }
];

