import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { AdminPendingRow } from '@neighborhub/shared';
import { BusinessService } from './business.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ConfirmModalService } from '../../core/jquery/confirm-modal.service';
import { ToastService } from '../../core/jquery/toast.service';
import { RelativeDatePipe } from '../../shared/pipes/relative-date.pipe';

@Component({
  selector: 'admin-business-pending',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent, RelativeDatePipe],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Businesses',link:'/businesses'},{label:'Pending'}]" />
    <div class="card shadow-sm">
      <div class="card-header"><h5 class="mb-0 text-uppercase">Pending Verification</h5></div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Verifications</th>
                <th>Submitted</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (b of rows(); track b.id) {
                <tr>
                  <td><strong>{{ b.name }}</strong></td>
                  <td>{{ b.category_name }}</td>
                  <td>{{ b.owner_name }}</td>
                  <td>{{ b.total_verifications }} / 5</td>
                  <td>{{ b.created_at | relativeDate }}</td>
                  <td class="text-end">
                    <button class="btn btn-success btn-sm" (click)="approve(b)">Approve</button>
                    <button class="btn btn-danger btn-sm ms-1" (click)="suspend(b)">Suspend</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="6" class="text-center text-muted py-4">No pending businesses.</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class BusinessPendingComponent implements OnInit {
  private service = inject(BusinessService);
  private confirm = inject(ConfirmModalService);
  private toast = inject(ToastService);
  rows = signal<AdminPendingRow[]>([]);

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.service.listPending().subscribe((r) => this.rows.set(r));
  }

  async approve(b: AdminPendingRow): Promise<void> {
    const ok = await this.confirm.ask(`Approve "${b.name}"?`);
    if (ok) this.service.approve(b.id).subscribe(() => { this.toast.show('Approved!', 'success'); this.refresh(); });
  }

  async suspend(b: AdminPendingRow): Promise<void> {
    const ok = await this.confirm.ask(`Suspend "${b.name}"?`);
    if (ok) this.service.suspend(b.id).subscribe(() => { this.toast.show('Suspended', 'danger'); this.refresh(); });
  }
}
