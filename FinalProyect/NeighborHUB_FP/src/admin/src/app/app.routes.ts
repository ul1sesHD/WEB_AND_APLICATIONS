import type { Routes } from '@angular/router';
import { AdminShellComponent } from './layout/admin-shell/admin-shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './core/auth/login.component';
import { adminGuard } from './core/auth/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminShellComponent,
    canActivate: [adminGuard],
    children: [
      { path: '',           component: DashboardComponent, title: 'Admin · NeighborHub' },
      { path: 'profiles',   loadChildren: () => import('./features/profiles/profiles.routes').then(m => m.PROFILE_ROUTES) },
      { path: 'categories', loadChildren: () => import('./features/categories/categories.routes').then(m => m.CATEGORY_ROUTES) },
      { path: 'businesses', loadChildren: () => import('./features/businesses/businesses.routes').then(m => m.BUSINESS_ROUTES) },
      { path: 'reviews',    loadChildren: () => import('./features/reviews/reviews.routes').then(m => m.REVIEW_ROUTES) },
      { path: 'visits',     loadChildren: () => import('./features/visits/visits.routes').then(m => m.VISIT_ROUTES) },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
