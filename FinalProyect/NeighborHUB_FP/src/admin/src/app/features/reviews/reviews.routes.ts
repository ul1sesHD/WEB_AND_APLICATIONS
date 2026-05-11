import type { Routes } from '@angular/router';
import { ReviewListComponent } from './review-list.component';
import { ReviewDetailComponent } from './review-detail.component';

export const REVIEW_ROUTES: Routes = [
  { path: '',    component: ReviewListComponent },
  { path: ':id', component: ReviewDetailComponent },
];
