import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import type { UserRole } from '@neighborhub/shared';
import { ProfileService } from './profile.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { AlertBannerComponent } from '../../shared/components/alert-banner/alert-banner.component';
import { FormFeedbackDirective } from '../../core/jquery/form-feedback.directive';
import { ToastService } from '../../core/jquery/toast.service';

@Component({
  selector: 'admin-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent, AlertBannerComponent, FormFeedbackDirective],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Profiles',link:'/profiles'},{label: id() ? 'Edit' : 'New'}]" />
    <div class="card shadow-sm">
      <div class="card-header"><h5 class="mb-0 text-uppercase">{{ id() ? 'Edit User' : 'New User' }}</h5></div>
      <div class="card-body">
        @if (error()) { <admin-alert-banner kind="danger">{{ error() }}</admin-alert-banner> }
        <form [formGroup]="form" (ngSubmit)="submit()" #formRef>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Name</label>
              <input class="form-control" formControlName="name" appFormFeedback>
              <div class="invalid-feedback">Name is required (3-100 chars).</div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Phone</label>
              <input class="form-control" formControlName="phone" appFormFeedback>
              <div class="invalid-feedback">Invalid phone number.</div>
            </div>
            <div class="col-md-4">
              <label class="form-label">Role</label>
              <select class="form-select" formControlName="role">
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Neighborhood</label>
              <input class="form-control" formControlName="neighborhood">
            </div>
            <div class="col-md-4">
              <label class="form-label">City</label>
              <input class="form-control" formControlName="city">
            </div>
            <div class="col-12">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" formControlName="active" id="activeCheck">
                <label class="form-check-label" for="activeCheck">Active</label>
              </div>
            </div>
          </div>
          <div class="mt-4 d-flex gap-2">
            <button type="submit" class="btn btn-primary" [disabled]="saving()">
              {{ saving() ? 'Saving…' : 'Save' }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="router.navigate(['/profiles'])">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ProfileFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ProfileService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    name:         ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    phone:        ['', [Validators.pattern(/^\+?[0-9]{10,15}$/)]],
    role:         ['user' as UserRole, Validators.required],
    neighborhood: ['', Validators.maxLength(100)],
    city:         ['Mexico City', Validators.required],
    active:       [true],
  });

  id = signal<string | null>(null);
  saving = signal(false);
  error = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.id.set(id);
      this.service.getById(id).subscribe((p) => this.form.patchValue(p as any));
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.error.set('');
    const val = this.form.getRawValue();
    const op$ = this.id()
      ? this.service.update(this.id()!, val)
      : this.service.update('', val);
    op$.subscribe({
      next: () => { this.toast.show('User saved'); this.router.navigate(['/profiles']); },
      error: (e) => { this.saving.set(false); this.error.set(e.message); },
    });
  }
}
