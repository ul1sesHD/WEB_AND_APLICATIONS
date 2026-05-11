import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type BreadcrumbItem = { label: string; link?: string };

@Component({
  selector: 'admin-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        @for (item of items; track item.label; let last = $last) {
          @if (last) {
            <li class="breadcrumb-item active" aria-current="page">{{ item.label }}</li>
          } @else {
            <li class="breadcrumb-item"><a [routerLink]="item.link ?? '/'">{{ item.label }}</a></li>
          }
        }
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
