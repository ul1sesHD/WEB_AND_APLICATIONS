import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import type { CategoryGroup } from '@neighborhub/shared';
import { CategoryService } from './category.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { AlertBannerComponent } from '../../shared/components/alert-banner/alert-banner.component';
import { FormFeedbackDirective } from '../../core/jquery/form-feedback.directive';
import { ToastService } from '../../core/jquery/toast.service';

@Component({
  selector: 'admin-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent, AlertBannerComponent, FormFeedbackDirective],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Categories',link:'/categories'},{label: id() ? 'Edit' : 'New'}]" />
    <div class="card shadow-sm">
      <div class="card-header"><h5 class="mb-0 text-uppercase">{{ id() ? 'Edit Category' : 'New Category' }}</h5></div>
      <div class="card-body">
        @if (error()) { <admin-alert-banner kind="danger">{{ error() }}</admin-alert-banner> }
        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Name</label>
              <input class="form-control" formControlName="name" appFormFeedback>
              <div class="invalid-feedback">Name is required.</div>
            </div>
            <div class="col-md-3">
              <label class="form-label">Icon (emoji)</label>
              <input class="form-control" formControlName="icon">
            </div>
            <div class="col-md-3">
              <label class="form-label">Color</label>
              <input type="color" class="form-control form-control-color" formControlName="color_hex">
            </div>
            <div class="col-md-12">
              <label class="form-label">Description</label>
              <textarea class="form-control" formControlName="description" rows="2"></textarea>
            </div>
            <div class="col-md-4">
              <label class="form-label">Group</label>
              <select class="form-select" formControlName="group_name">
                <option value="food">Food</option>
                <option value="services">Services</option>
                <option value="circular">Circular</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Display Order</label>
              <input type="number" class="form-control" formControlName="display_order">
            </div>
            <div class="col-md-4">
              <label class="form-label">Image URL</label>
              <input class="form-control" formControlName="image_url">
            </div>
            <div class="col-12">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" formControlName="active" id="catActive">
                <label class="form-check-label" for="catActive">Active</label>
              </div>
            </div>
          </div>
          <div class="mt-4 d-flex gap-2">
            <button type="submit" class="btn btn-primary" [disabled]="saving()">{{ saving() ? 'Saving…' : 'Save' }}</button>
            <button type="button" class="btn btn-secondary" (click)="router.navigate(['/categories'])">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CategoryFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    name:          ['', Validators.required],
    description:   [''],
    icon:          [''],
    image_url:     [''],
    color_hex:     ['#C0392B', Validators.pattern(/^#[0-9A-Fa-f]{6}$/)],
    group_name:    ['food' as CategoryGroup, Validators.required],
    display_order: [0],
    active:        [true],
  });

  id = signal<string | null>(null);
  saving = signal(false);
  error = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.id.set(id);
      this.service.getById(id).subscribe((c) => this.form.patchValue(c as any));
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.error.set('');
    const val = this.form.getRawValue();
    const op$ = this.id()
      ? this.service.update(this.id()!, val)
      : this.service.create(val as any);
    op$.subscribe({
      next: () => { this.toast.show('Category saved'); this.router.navigate(['/categories']); },
      error: (e) => { this.saving.set(false); this.error.set(e.message); },
    });
  }
}
