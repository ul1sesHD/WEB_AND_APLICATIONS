import { Directive, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Directive({ selector: '[appDropdownSearch]', standalone: true })
export class DropdownSearchDirective implements AfterViewInit, OnDestroy {
  @Output() appDropdownSearch = new EventEmitter<string>();
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private el: ElementRef<HTMLSelectElement>) {}

  ngAfterViewInit(): void {
    const $select = $(this.el.nativeElement);
    const $input = $('<input type="text" class="form-control form-control-sm mb-1" placeholder="Filter…">')
      .insertBefore($select);

    $input.on('keyup.dropSearch', () => {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const val = ($input.val() as string).toLowerCase();
        $select.find('option').each((_: number, opt: HTMLOptionElement) => {
          const match = $(opt).text().toLowerCase().includes(val);
          $(opt).toggle(match);
        });
        this.appDropdownSearch.emit(val);
      }, 200);
    });
  }

  ngOnDestroy(): void {
    $(this.el.nativeElement).prev('input').off('.dropSearch').remove();
    if (this.timer) clearTimeout(this.timer);
  }
}
