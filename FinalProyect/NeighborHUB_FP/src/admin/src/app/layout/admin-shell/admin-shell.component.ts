import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'admin-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="d-flex">
      <admin-sidebar />
      <div class="flex-grow-1 d-flex flex-column min-vh-100">
        <admin-topbar />
        <main class="flex-grow-1 p-4">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class AdminShellComponent {}
