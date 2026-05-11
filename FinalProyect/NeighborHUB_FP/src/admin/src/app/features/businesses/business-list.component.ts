import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import type { BusinessDirectoryRow } from '@neighborhub/shared';
import { BusinessService } from './business.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { TableSortDirective } from '../../core/jquery/table-sort.directive';
import { TooltipDirective } from '../../core/jquery/tooltip.directive';
import { ConfirmModalService } from '../../core/jquery/confirm-modal.service';
import { ToastService } from '../../core/jquery/toast.service';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
@Component({
  selector: 'admin-business-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, BreadcrumbComponent, SearchBarComponent,
    TableSortDirective, TooltipDirective, RelativeDatePipe],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Businesses'}]" />
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0 text-uppercase">Businesses</h5>
        <a routerLink="new" class="btn btn-primary btn-sm">+ New</a>
      </div>
      <div class="card-body">
        <div class="row g-2 mb-3">
          <div class="col-md-5">
            <admin-search-bar [control]="search" placeholder="Search…" />
          </div>
          <div class="col-md-3">
            <select class="form-select" [formControl]="status">
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle" appTableSort>
            <thead class="table-light">
              <tr>
                <th data-sort="name">Name</th>
                <th>Category</th>
                <th data-sort="status">Status</th>
                <th>Rating</th>
                <th data-sort="created_at">Created</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (b of rows(); track b.id) {
                <tr>
                  <td><strong>{{ b.name }}</strong></td>
                  <td><span class="badge" [style.background]="b.category_color" style="color:#fff">{{ b.category_name }}</span></td>
                  <td><span class="badge" [class]="statusBadge(b.status)">{{ b.status }}</span></td>
                  <td>{{ b.rating_avg | number:'1.1-1' }} ({{ b.total_reviews }})</td>
                  <td>{{ b.created_at | relativeDate }}</td>
                  <td class="text-end">
                    <a [routerLink]="[b.id]" class="btn btn-outline-primary btn-sm" appTooltip title="Edit">Edit</a>
                    <button class="btn btn-outline-danger btn-sm ms-1" (click)="onDelete(b)">Delete</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="6" class="text-center text-muted py-4">No businesses found.</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class BusinessListComponent implements OnInit {
  private service = inject(BusinessService);
  private confirm = inject(ConfirmModalService);
  private toast = inject(ToastService);

  search = new FormControl('', { nonNullable: true });
  status = new FormControl('all', { nonNullable: true });
  rows = signal<BusinessDirectoryRow[]>([]);

  private debounce: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.refresh();
    this.search.valueChanges.subscribe(() => {
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(() => this.refresh(), 300);
    });
    this.status.valueChanges.subscribe(() => this.refresh());
  }

  refresh(): void {
    this.service.list({ search: this.search.value || undefined, status: this.status.value })
      .subscribe((r) => this.rows.set(r));
  }

  statusBadge(s: string): string {
    if (s === 'active')    return 'text-bg-success';
    if (s === 'pending')   return 'text-bg-warning';
    if (s === 'suspended') return 'text-bg-danger';
    return 'text-bg-secondary';
  }

  async onDelete(b: BusinessDirectoryRow): Promise<void> {
    const ok = await this.confirm.ask(`Delete business "${b.name}"?`);
    if (ok) this.service.softDelete(b.id).subscribe(() => { this.toast.show('Business deleted'); this.refresh(); });
  }
}
