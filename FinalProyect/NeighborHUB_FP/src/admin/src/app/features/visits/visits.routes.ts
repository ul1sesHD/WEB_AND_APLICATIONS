import type { Routes } from '@angular/router';
import { VisitListComponent } from './visit-list.component';
import { VisitReportComponent } from './visit-report.component';

export const VISIT_ROUTES: Routes = [
  { path: '',        component: VisitListComponent },
  { path: 'reports', component: VisitReportComponent },
];
