import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VisitService } from './visit.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { TableSortDirective } from '../../core/jquery/table-sort.directive';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
import { DistancePipe } from '../../shared/pipes/distance.pipe';

@Component({
  selector: 'admin-visit-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent, TableSortDirective, RelativeDatePipe, DistancePipe],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Visits'}]" />
    <div class="d-flex justify-content-between mb-3">
      <h5 class="text-uppercase font-display">Visits</h5>
      <a routerLink="reports" class="btn btn-outline-primary btn-sm">View Reports</a>
    </div>
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle" appTableSort>
            <thead class="table-light">
              <tr>
                <th>Visitor</th>
                <th>Business</th>
                <th data-sort="km_distance">Distance</th>
                <th data-sort="co2_saved_kg">CO₂ Saved</th>
                <th>Spending</th>
                <th data-sort="created_at">Date</th>
              </tr>
            </thead>
            <tbody>
              @for (v of rows(); track v.id) {
                <tr>
                  <td>{{ v.visitor?.name ?? '—' }}</td>
                  <td>{{ v.business?.name ?? '—' }}</td>
                  <td>{{ v.km_distance | distance }}</td>
                  <td>{{ v.co2_saved_kg | number:'1.2-2' }} kg</td>
                  <td>{{ v.reported_spending ? ('$' + v.reported_spending) : '—' }}</td>
                  <td>{{ v.created_at | relativeDate }}</td>
                </tr>
              } @empty {
                <tr><td colspan="6" class="text-center text-muted py-4">No visits recorded.</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class VisitListComponent implements OnInit {
  private service = inject(VisitService);
  rows = signal<any[]>([]);

  ngOnInit(): void {
    this.service.list({ limit: 200 }).subscribe((r) => this.rows.set(r));
  }
}
