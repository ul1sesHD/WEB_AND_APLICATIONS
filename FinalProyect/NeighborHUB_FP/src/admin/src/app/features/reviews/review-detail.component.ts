import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from './review.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ToastService } from '../../core/jquery/toast.service';
import { ConfirmModalService } from '../../core/jquery/confirm-modal.service';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';

@Component({
  selector: 'admin-review-detail',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, RelativeDatePipe],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Reviews',link:'/reviews'},{label:'Detail'}]" />
    @if (review()) {
      <div class="card shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0 text-uppercase">Review Detail</h5>
          <span class="badge" [class]="review()!.active ? 'text-bg-success' : 'text-bg-secondary'">
            {{ review()!.active ? 'Active' : 'Inactive' }}
          </span>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="text-muted small">Business</label>
              <p class="fw-bold">{{ review()!.business?.name ?? '—' }}</p>
            </div>
            <div class="col-md-6">
              <label class="text-muted small">Author</label>
              <p class="fw-bold">{{ review()!.author?.name ?? '—' }}</p>
            </div>
            <div class="col-md-6">
              <label class="text-muted small">Rating</label>
              <p>{{ review()!.rating }} / 5</p>
            </div>
            <div class="col-md-6">
              <label class="text-muted small">Date</label>
              <p>{{ review()!.created_at | relativeDate }}</p>
            </div>
            <div class="col-12">
              <label class="text-muted small">Comment</label>
              <p>{{ review()!.comment ?? 'No comment.' }}</p>
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-warning btn-sm" (click)="toggle()">
              {{ review()!.active ? 'Deactivate' : 'Reactivate' }}
            </button>
            <button class="btn btn-danger btn-sm" (click)="onDelete()">Delete</button>
            <button class="btn btn-secondary btn-sm" (click)="router.navigate(['/reviews'])">Back</button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ReviewDetailComponent implements OnInit {
  private service = inject(ReviewService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmModalService);
  router = inject(Router);
  review = signal<any>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe((r) => this.review.set(r));
  }

  toggle(): void {
    const r = this.review();
    this.service.toggleActive(r.id, !r.active).subscribe((updated) => {
      this.review.set({ ...r, active: updated.active });
      this.toast.show(updated.active ? 'Activated' : 'Deactivated');
    });
  }

  async onDelete(): Promise<void> {
    const ok = await this.confirm.ask('Permanently delete this review?');
    if (ok) this.service.softDelete(this.review().id).subscribe(() => {
      this.toast.show('Deleted');
      this.router.navigate(['/reviews']);
    });
  }
}
