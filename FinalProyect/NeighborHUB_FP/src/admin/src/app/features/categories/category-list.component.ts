import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Category } from '@neighborhub/shared';
import { CategoryService } from './category.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { TableSortDirective } from '../../core/jquery/table-sort.directive';
import { ConfirmModalService } from '../../core/jquery/confirm-modal.service';
import { ToastService } from '../../core/jquery/toast.service';

@Component({
  selector: 'admin-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent, TableSortDirective],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Categories'}]" />
    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0 text-uppercase">Categories</h5>
        <a routerLink="new" class="btn btn-primary btn-sm">+ New</a>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle" appTableSort>
            <thead class="table-light">
              <tr>
                <th>Icon</th>
                <th data-sort="name">Name</th>
                <th data-sort="group_name">Group</th>
                <th>Color</th>
                <th data-sort="display_order">Order</th>
                <th>Active</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (c of rows(); track c.id) {
                <tr>
                  <td><span class="fs-4">{{ c.icon ?? '—' }}</span></td>
                  <td><strong>{{ c.name }}</strong></td>
                  <td><span class="badge text-bg-info text-uppercase">{{ c.group_name }}</span></td>
                  <td><span class="d-inline-block rounded-circle" [style.background]="c.color_hex"
                    style="width:20px;height:20px"></span></td>
                  <td>{{ c.display_order }}</td>
                  <td>
                    <span class="badge" [class]="c.active ? 'text-bg-success' : 'text-bg-secondary'">
                      {{ c.active ? 'Yes' : 'No' }}
                    </span>
                  </td>
                  <td class="text-end">
                    <a [routerLink]="[c.id]" class="btn btn-outline-primary btn-sm">Edit</a>
                    <button class="btn btn-outline-danger btn-sm ms-1" (click)="onDeactivate(c)">Deactivate</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="7" class="text-center text-muted py-4">No categories.</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class CategoryListComponent implements OnInit {
  private service = inject(CategoryService);
  private confirm = inject(ConfirmModalService);
  private toast = inject(ToastService);
  rows = signal<Category[]>([]);

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.service.list().subscribe((r) => this.rows.set(r));
  }

  async onDeactivate(c: Category): Promise<void> {
    const ok = await this.confirm.ask(`Deactivate category "${c.name}"?`);
    if (ok) this.service.deactivate(c.id).subscribe(() => { this.toast.show('Category deactivated'); this.refresh(); });
  }
}
