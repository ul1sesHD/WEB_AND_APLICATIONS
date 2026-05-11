import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import type { BusinessStatus } from '@neighborhub/shared';
import { BusinessService } from './business.service';
import { CategoryService } from '../categories/category.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { AlertBannerComponent } from '../../shared/components/alert-banner/alert-banner.component';
import { FormFeedbackDirective } from '../../core/jquery/form-feedback.directive';
import { ImagePreviewDirective } from '../../core/jquery/image-preview.directive';
import { ToastService } from '../../core/jquery/toast.service';

@Component({
  selector: 'admin-business-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent, AlertBannerComponent, FormFeedbackDirective, ImagePreviewDirective],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Businesses',link:'/businesses'},{label: id() ? 'Edit' : 'New'}]" />
    @if (error()) { <admin-alert-banner kind="danger">{{ error() }}</admin-alert-banner> }
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="card shadow-sm mb-3">
        <div class="card-header"><h5 class="mb-0">Identity</h5></div>
        <div class="card-body row g-3">
          <div class="col-md-6">
            <label class="form-label">Name</label>
            <input class="form-control" formControlName="name" appFormFeedback>
            <div class="invalid-feedback">Name is required.</div>
          </div>
          <div class="col-md-3">
            <label class="form-label">Category</label>
            <select class="form-select" formControlName="category_id">
              @for (c of categories(); track c.id) { <option [value]="c.id">{{ c.name }}</option> }
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Status</label>
            <select class="form-select" formControlName="status">
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="col-12">
            <label class="form-label">Description</label>
            <textarea class="form-control" formControlName="description" rows="2"></textarea>
          </div>
        </div>
      </div>
      <div class="card shadow-sm mb-3">
        <div class="card-header"><h5 class="mb-0">Story</h5></div>
        <div class="card-body row g-3">
          <div class="col-md-6">
            <label class="form-label">Vendor Name</label>
            <input class="form-control" formControlName="vendor_name">
          </div>
          <div class="col-md-6">
            <label class="form-label">Vendor Quote</label>
            <input class="form-control" formControlName="vendor_quote">
          </div>
          <div class="col-12">
            <label class="form-label">Story</label>
            <textarea class="form-control" formControlName="story" rows="3"></textarea>
          </div>
          <div class="col-md-4">
            <label class="form-label">Phone</label>
            <input class="form-control" formControlName="phone">
          </div>
          <div class="col-md-4">
            <label class="form-label">WhatsApp</label>
            <input class="form-control" formControlName="whatsapp">
          </div>
          <div class="col-md-4">
            <label class="form-label">Website</label>
            <input class="form-control" formControlName="website">
          </div>
          <div class="col-12">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" formControlName="is_eco_friendly" id="ecoCheck">
              <label class="form-check-label" for="ecoCheck">Eco-friendly</label>
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Photo</label>
            <input type="file" class="form-control" appImagePreview accept="image/*">
            <img class="img-preview mt-2 rounded" style="max-height:80px;display:none" alt="">
          </div>
        </div>
      </div>
      <div class="card shadow-sm mb-3">
        <div class="card-header"><h5 class="mb-0">Location</h5></div>
        <div class="card-body row g-3">
          <div class="col-md-6">
            <label class="form-label">Address</label>
            <input class="form-control" formControlName="address" appFormFeedback>
          </div>
          <div class="col-md-3">
            <label class="form-label">Neighborhood</label>
            <input class="form-control" formControlName="neighborhood">
          </div>
          <div class="col-md-3">
            <label class="form-label">Landmark</label>
            <input class="form-control" formControlName="landmark">
          </div>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary" [disabled]="saving()">{{ saving() ? 'Saving…' : 'Save' }}</button>
        <button type="button" class="btn btn-secondary" (click)="router.navigate(['/businesses'])">Cancel</button>
      </div>
    </form>
  `,
})
export class BusinessFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(BusinessService);
  private catService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    name:           ['', Validators.required],
    category_id:    ['', Validators.required],
    status:         ['pending' as BusinessStatus],
    description:    [''],
    vendor_name:    [''],
    vendor_quote:   [''],
    story:          [''],
    phone:          [''],
    whatsapp:       [''],
    website:        [''],
    is_eco_friendly:[false],
    address:        ['', Validators.required],
    neighborhood:   [''],
    landmark:       [''],
  });

  id = signal<string | null>(null);
  saving = signal(false);
  error = signal('');
  categories = signal<any[]>([]);

  ngOnInit(): void {
    this.catService.list().subscribe((c) => this.categories.set(c));
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.id.set(id);
      this.service.getById(id).subscribe((b) => this.form.patchValue(b as any));
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.getRawValue();
    const op$ = this.id()
      ? this.service.update(this.id()!, val)
      : this.service.create({ ...val, owner_id: '', location: 'POINT(-99.1332 19.4326)', city: 'CDMX' } as any);
    op$.subscribe({
      next: () => { this.toast.show('Business saved'); this.router.navigate(['/businesses']); },
      error: (e) => { this.saving.set(false); this.error.set(e.message); },
    });
  }
}
