import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (totalPages > 1) {
      <nav>
        <ul class="pagination pagination-sm justify-content-center mt-3">
          <li class="page-item" [class.disabled]="current === 1">
            <button class="page-link" (click)="go(current - 1)">&laquo;</button>
          </li>
          @for (p of pages; track p) {
            <li class="page-item" [class.active]="p === current">
              <button class="page-link" (click)="go(p)">{{ p }}</button>
            </li>
          }
          <li class="page-item" [class.disabled]="current === totalPages">
            <button class="page-link" (click)="go(current + 1)">&raquo;</button>
          </li>
        </ul>
      </nav>
    }
  `,
})
export class PaginationComponent {
  @Input() current = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    const p: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) p.push(i);
    return p;
  }

  go(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.current) {
      this.pageChange.emit(page);
    }
  }
}
