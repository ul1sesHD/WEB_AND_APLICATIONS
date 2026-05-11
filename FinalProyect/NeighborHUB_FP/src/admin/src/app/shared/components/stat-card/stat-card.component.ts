import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-stat-card',
  standalone: true,
  template: `
    <div class="card shadow-sm h-100">
      <div class="card-body text-center">
        <p class="text-muted text-uppercase small mb-1">{{ label }}</p>
        <h3 class="font-display mb-0" [style.color]="color">{{ value }}</h3>
      </div>
    </div>
  `,
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value: string | number = 0;
  @Input() color = 'var(--color-comal-brown)';
}
