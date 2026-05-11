import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;

@Directive({ selector: '[appSidebarCollapse]', standalone: true })
export class SidebarCollapseDirective implements AfterViewInit, OnDestroy {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const $sidebar = $(this.el.nativeElement);
    $sidebar.find('.sidebar-toggle').on('click.collapse', () => {
      $sidebar.toggleClass('collapsed');
    });
  }

  ngOnDestroy(): void {
    $(this.el.nativeElement).find('.sidebar-toggle').off('.collapse');
  }
}
