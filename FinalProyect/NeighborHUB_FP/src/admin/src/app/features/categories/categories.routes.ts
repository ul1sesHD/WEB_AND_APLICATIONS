import type { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list.component';
import { CategoryFormComponent } from './category-form.component';

export const CATEGORY_ROUTES: Routes = [
  { path: '',    component: CategoryListComponent },
  { path: 'new', component: CategoryFormComponent },
  { path: ':id', component: CategoryFormComponent },
];
