import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getSupabase } from '@neighborhub/shared';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { TabSwitcherDirective } from '../../core/jquery/tab-switcher.directive';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatCardComponent, TabSwitcherDirective],
  template: `
    <h2 class="font-display text-uppercase mb-4">Dashboard</h2>

    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <admin-stat-card label="Total Businesses" [value]="stats().businesses" color="var(--color-toldo-red)" />
      </div>
      <div class="col-md-3">
        <admin-stat-card label="Active Users" [value]="stats().users" color="var(--color-quellite-green)" />
      </div>
      <div class="col-md-3">
        <admin-stat-card label="Total Reviews" [value]="stats().reviews" color="var(--color-corn-yellow)" />
      </div>
      <div class="col-md-3">
        <admin-stat-card label="Total Visits" [value]="stats().visits" color="var(--color-sign-blue)" />
      </div>
    </div>

    <div class="card shadow-sm" appTabSwitcher>
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#pending">Pending Businesses</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#recent">Recent Activity</a>
          </li>
        </ul>
      </div>
      <div class="card-body tab-content">
        <div class="tab-pane fade show active" id="pending">
          @if (pending().length === 0) {
            <p class="text-muted text-center py-3">No pending businesses.</p>
          } @else {
            <ul class="list-group list-group-flush">
              @for (b of pending(); track b.id) {
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{{ b.name }}</strong>
                    <span class="badge text-bg-warning ms-2">{{ b.status }}</span>
                  </div>
                  <a [routerLink]="['/businesses', b.id]" class="btn btn-outline-primary btn-sm">Review</a>
                </li>
              }
            </ul>
          }
        </div>
        <div class="tab-pane fade" id="recent">
          <p class="text-muted text-center py-3">Recent visits and reviews overview.</p>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private sb = getSupabase();
  stats = signal({ businesses: 0, users: 0, reviews: 0, visits: 0 });
  pending = signal<any[]>([]);

  async ngOnInit(): Promise<void> {
    const [b, u, r, v, p] = await Promise.all([
      this.sb.from('businesses').select('id', { count: 'exact', head: true }),
      this.sb.from('profiles').select('id', { count: 'exact', head: true }).eq('active', true),
      this.sb.from('reviews').select('id', { count: 'exact', head: true }),
      this.sb.from('visits').select('id', { count: 'exact', head: true }),
      this.sb.from('v_admin_pending').select('*').limit(10),
    ]);
    this.stats.set({
      businesses: b.count ?? 0,
      users: u.count ?? 0,
      reviews: r.count ?? 0,
      visits: v.count ?? 0,
    });
    this.pending.set(p.data ?? []);
  }
}
