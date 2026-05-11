import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;
declare var bootstrap: any;

@Directive({ selector: '[appTabSwitcher]', standalone: true })
export class TabSwitcherDirective implements AfterViewInit, OnDestroy {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    $(this.el.nativeElement).find('[data-bs-toggle="tab"]').each((_: number, el: HTMLElement) => {
      $(el).on('click.tabSwitch', (e: Event) => {
        e.preventDefault();
        new bootstrap.Tab(el).show();
      });
    });
  }

  ngOnDestroy(): void {
    $(this.el.nativeElement).find('[data-bs-toggle="tab"]').off('.tabSwitch');
  }
}
