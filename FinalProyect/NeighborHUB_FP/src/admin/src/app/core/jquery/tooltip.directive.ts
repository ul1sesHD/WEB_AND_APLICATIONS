import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;
declare var bootstrap: any;

@Directive({ selector: '[appTooltip]', standalone: true })
export class TooltipDirective implements AfterViewInit, OnDestroy {
  private tooltip: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const $el = $(this.el.nativeElement);
    if ($el.attr('title') || $el.attr('data-bs-title')) {
      this.tooltip = new bootstrap.Tooltip(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.tooltip?.dispose();
  }
}
