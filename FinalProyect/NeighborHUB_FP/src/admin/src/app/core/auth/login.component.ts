import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center">
      <div class="card shadow-sm" style="max-width: 400px; width: 100%">
        <div class="card-body p-4">
          <div class="text-center mb-4">
            <img src="LogoNeighborHub.png" alt="NeighborHub" style="max-width: 180px" class="mb-2">
            <h2 class="h4 font-display text-uppercase">Admin Login</h2>
          </div>
          @if (error()) {
            <div class="alert alert-danger py-2">{{ error() }}</div>
          }
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" formControlName="email"
                [class.is-invalid]="form.controls.email.touched && form.controls.email.invalid">
              <div class="invalid-feedback">Valid email is required.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" formControlName="password"
                [class.is-invalid]="form.controls.password.touched && form.controls.password.invalid">
              <div class="invalid-feedback">Password is required.</div>
            </div>
            <button type="submit" class="btn btn-primary w-100" [disabled]="loading()">
              {{ loading() ? 'Signing in…' : 'Sign In' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loading = signal(false);
  error = signal('');

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    const { email, password } = this.form.getRawValue();
    const result = await this.auth.signIn(email, password);
    if (result.error) {
      this.error.set(result.error);
      this.loading.set(false);
      return;
    }
    const profile = await this.auth.getCurrentProfile();
    if (!profile || profile.role !== 'admin') {
      this.error.set('Access denied. Admin role required.');
      await this.auth.signOut();
      this.loading.set(false);
      return;
    }
    this.router.navigate(['/']);
  }
}
