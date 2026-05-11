import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReviewService } from './review.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { TableSortDirective } from '../../core/jquery/table-sort.directive';
import { ConfirmModalService } from '../../core/jquery/confirm-modal.service';
import { ToastService } from '../../core/jquery/toast.service';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';

@Component({
  selector: 'admin-review-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent, TableSortDirective, RelativeDatePipe],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Reviews'}]" />
    <div class="card shadow-sm">
      <div class="card-header"><h5 class="mb-0 text-uppercase">Reviews</h5></div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle" appTableSort>
            <thead class="table-light">
              <tr>
                <th>Business</th>
                <th data-sort="rating">Rating</th>
                <th>Comment</th>
                <th>Author</th>
                <th>Active</th>
                <th data-sort="created_at">Date</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (r of rows(); track r.id) {
                <tr>
                  <td>{{ r.business?.name ?? '—' }}</td>
                  <td>
                    @for (s of starsFor(r.rating); track $index) { <span class="text-warning">&#9733;</span> }
                  </td>
                  <td class="text-truncate" style="max-width:200px">{{ r.comment ?? '—' }}</td>
                  <td>{{ r.author?.name ?? '—' }}</td>
                  <td>
                    <span class="badge cursor-pointer" [class]="r.active ? 'text-bg-success' : 'text-bg-secondary'"
                      (click)="toggleActive(r)">{{ r.active ? 'Active' : 'Inactive' }}</span>
                  </td>
                  <td>{{ r.created_at | relativeDate }}</td>
                  <td class="text-end">
                    <a [routerLink]="[r.id]" class="btn btn-outline-primary btn-sm">Detail</a>
                    <button class="btn btn-outline-danger btn-sm ms-1" (click)="onDelete(r)">Delete</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="7" class="text-center text-muted py-4">No reviews.</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ReviewListComponent implements OnInit {
  private service = inject(ReviewService);
  private confirm = inject(ConfirmModalService);
  private toast = inject(ToastService);
  rows = signal<any[]>([]);

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.service.list().subscribe((r) => this.rows.set(r));
  }

  starsFor(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }

  toggleActive(r: any): void {
    this.service.toggleActive(r.id, !r.active).subscribe(() => {
      this.toast.show(r.active ? 'Deactivated' : 'Activated');
      this.refresh();
    });
  }

  async onDelete(r: any): Promise<void> {
    const ok = await this.confirm.ask('Delete this review?');
    if (ok) this.service.softDelete(r.id).subscribe(() => { this.toast.show('Deleted'); this.refresh(); });
  }
}
