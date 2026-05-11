import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarCollapseDirective } from '../../core/jquery/sidebar-collapse.directive';

const NAV_ITEMS = [
  { label: 'Dashboard',  icon: 'bi-speedometer2', link: '/' },
  { label: 'Profiles',   icon: 'bi-people',       link: '/profiles' },
  { label: 'Categories', icon: 'bi-tags',          link: '/categories' },
  { label: 'Businesses', icon: 'bi-shop',          link: '/businesses' },
  { label: 'Reviews',    icon: 'bi-star',          link: '/reviews' },
  { label: 'Visits',     icon: 'bi-graph-up',      link: '/visits' },
] as const;

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SidebarCollapseDirective],
  template: `
    <nav class="d-flex flex-column p-3 text-white min-vh-100" appSidebarCollapse
      style="width: 220px; background: var(--color-comal-brown)">
      <div class="d-flex align-items-center mb-4">
        <img src="LogoNeighborHub.png" alt="Logo" style="height: 36px" class="me-2">
        <span class="font-display fs-5 text-uppercase">Admin</span>
      </div>
      <ul class="nav nav-pills flex-column gap-1">
        @for (item of items; track item.label) {
          <li class="nav-item">
            <a class="nav-link text-white d-flex align-items-center gap-2"
              [routerLink]="item.link" routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: item.link === '/' }">
              <i class="bi" [ngClass]="item.icon"></i>
              {{ item.label }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [`
    .nav-link.active { background: var(--color-toldo-red) !important; }
    .nav-link:hover:not(.active) { background: rgba(255,255,255,.1); }
  `],
})
export class SidebarComponent {
  items = NAV_ITEMS;
}
