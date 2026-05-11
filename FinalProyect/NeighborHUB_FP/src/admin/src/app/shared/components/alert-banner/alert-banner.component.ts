import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-alert-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert" [ngClass]="alertClass" role="alert">
      <ng-content />
    </div>
  `,
})
export class AlertBannerComponent {
  @Input() kind: 'success' | 'danger' | 'warning' | 'info' = 'info';

  get alertClass(): string {
    return `alert-${this.kind}`;
  }
}
