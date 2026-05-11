import { Directive, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Directive({ selector: '[appLiveSearch]', standalone: true })
export class LiveSearchDirective implements AfterViewInit, OnDestroy {
  @Output() appLiveSearch = new EventEmitter<string>();
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    $(this.el.nativeElement).on('keyup.liveSearch', () => {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.appLiveSearch.emit($(this.el.nativeElement).val() as string);
      }, 250);
    });
  }

  ngOnDestroy(): void {
    $(this.el.nativeElement).off('.liveSearch');
    if (this.timer) clearTimeout(this.timer);
  }
}
