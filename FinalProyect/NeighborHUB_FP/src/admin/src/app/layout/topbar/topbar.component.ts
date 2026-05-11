import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TooltipDirective } from '../../core/jquery/tooltip.directive';

@Component({
  selector: 'admin-topbar',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-3">
      <span class="navbar-brand font-display text-uppercase">NeighborHub</span>
      <div class="ms-auto d-flex align-items-center gap-3">
        @if (name()) {
          <span class="badge text-bg-secondary text-uppercase" appTooltip title="Logged in as admin">
            {{ name() }}
          </span>
        }
        <button class="btn btn-outline-danger btn-sm" (click)="logout()">Sign out</button>
      </div>
    </nav>
  `,
})
export class TopbarComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  name = signal('');

  async ngOnInit(): Promise<void> {
    const p = await this.auth.getCurrentProfile();
    if (p) this.name.set(p.name);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
