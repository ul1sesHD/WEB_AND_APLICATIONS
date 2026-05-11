import type { Routes } from '@angular/router';
import { BusinessListComponent } from './business-list.component';
import { BusinessFormComponent } from './business-form.component';
import { BusinessPendingComponent } from './business-pending.component';

export const BUSINESS_ROUTES: Routes = [
  { path: '',        component: BusinessListComponent },
  { path: 'pending', component: BusinessPendingComponent },
  { path: 'new',     component: BusinessFormComponent },
  { path: ':id',     component: BusinessFormComponent },
];
