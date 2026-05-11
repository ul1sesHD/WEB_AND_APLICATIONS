import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { LiveSearchDirective } from '../../../core/jquery/live-search.directive';

@Component({
  selector: 'admin-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, LiveSearchDirective],
  template: `
    <input type="search" class="form-control" [placeholder]="placeholder"
      [formControl]="control" appLiveSearch (appLiveSearch)="control.setValue($event)">
  `,
})
export class SearchBarComponent {
  @Input() control = new FormControl('', { nonNullable: true });
  @Input() placeholder = 'Search…';
}
