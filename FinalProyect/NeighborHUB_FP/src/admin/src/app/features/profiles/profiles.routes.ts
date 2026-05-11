import type { Routes } from '@angular/router';
import { ProfileListComponent } from './profile-list.component';
import { ProfileFormComponent } from './profile-form.component';

export const PROFILE_ROUTES: Routes = [
  { path: '',    component: ProfileListComponent },
  { path: 'new', component: ProfileFormComponent },
  { path: ':id', component: ProfileFormComponent },
];
