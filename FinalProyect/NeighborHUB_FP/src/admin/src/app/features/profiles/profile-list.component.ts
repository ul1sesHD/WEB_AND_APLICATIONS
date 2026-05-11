import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import type { Profile } from '@neighborhub/shared';
import { ProfileService } from './profile.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { AlertBannerComponent } from '../../shared/components/alert-banner/alert-banner.component';
import { TableSortDirective } from '../../core/jquery/table-sort.directive';
import { TooltipDirective } from '../../core/jquery/tooltip.directive';
import { ConfirmModalService } from '../../core/jquery/confirm-modal.service';
import { ToastService } from '../../core/jquery/toast.service';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';
@Component({
  selector: 'admin-profile-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, BreadcrumbComponent, SearchBarComponent,
    AlertBannerComponent, TableSortDirective, TooltipDirective, RelativeDatePipe],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Profiles'}]" />
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0 text-uppercase">Users</h5>
      </div>
      <div class="card-body">
        <div class="row g-2 mb-3">
          <div class="col-md-6">
            <admin-search-bar [control]="search" placeholder="Search by name…" />
          </div>
          <div class="col-md-3">
            <select class="form-select" [formControl]="role">
              <option value="">All roles</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle" appTableSort>
            <thead class="table-light">
              <tr>
                <th data-sort="name">Name</th>
                <th data-sort="role">Role</th>
                <th data-sort="neighborhood">Neighborhood</th>
                <th data-sort="created_at">Created</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (p of rows(); track p.id) {
                <tr>
                  <td><strong>{{ p.name }}</strong></td>
                  <td><span class="badge" [class]="badgeClass(p.role)">{{ p.role }}</span></td>
                  <td>{{ p.neighborhood ?? '—' }}</td>
                  <td>{{ p.created_at | relativeDate }}</td>
                  <td class="text-end">
                    <a [routerLink]="[p.id]" class="btn btn-outline-primary btn-sm" appTooltip title="Edit">Edit</a>
                    <button class="btn btn-outline-danger btn-sm ms-1" (click)="onDelete(p)">Delete</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="text-center text-muted py-4">No users found.</td></tr>
              }
            </tbody>
          </table>
        </div>
        @if (loading()) { <admin-alert-banner kind="info">Loading…</admin-alert-banner> }
      </div>
    </div>
  `,
})
export class ProfileListComponent implements OnInit {
  private service = inject(ProfileService);
  private confirm = inject(ConfirmModalService);
  private toast = inject(ToastService);

  search = new FormControl('', { nonNullable: true });
  role   = new FormControl('', { nonNullable: true });
  rows   = signal<Profile[]>([]);
  loading = signal(false);

  private debounce: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.refresh();
    this.search.valueChanges.subscribe(() => {
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(() => this.refresh(), 300);
    });
    this.role.valueChanges.subscribe(() => this.refresh());
  }

  refresh(): void {
    this.loading.set(true);
    this.service.list({ search: this.search.value || undefined, role: this.role.value || undefined })
      .subscribe({ next: (r) => { this.rows.set(r); this.loading.set(false); }, error: () => this.loading.set(false) });
  }

  badgeClass(role: string): string {
    if (role === 'admin') return 'text-bg-danger';
    if (role === 'vendor') return 'text-bg-info';
    return 'text-bg-secondary';
  }

  async onDelete(p: Profile): Promise<void> {
    const ok = await this.confirm.ask(`Delete user "${p.name}"?`);
    if (ok) this.service.softDelete(p.id).subscribe(() => { this.toast.show('User deleted'); this.refresh(); });
  }
}
