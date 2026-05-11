import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;

@Directive({ selector: '[appTableSort]', standalone: true })
export class TableSortDirective implements AfterViewInit, OnDestroy {
  private $el: any;

  constructor(private el: ElementRef<HTMLTableElement>) {}

  ngAfterViewInit(): void {
    this.$el = $(this.el.nativeElement);
    this.$el.find('th[data-sort]').css('cursor', 'pointer').on('click.tableSort', (e: any) => {
      const $th = $(e.currentTarget);
      const col = $th.index();
      const asc = !$th.hasClass('sort-asc');
      this.$el.find('th').removeClass('sort-asc sort-desc');
      $th.addClass(asc ? 'sort-asc' : 'sort-desc');

      const $tbody = this.$el.find('tbody');
      const rows = $tbody.find('tr').get();
      rows.sort((a: HTMLTableRowElement, b: HTMLTableRowElement) => {
        const aText = $(a).children('td').eq(col).text().trim().toLowerCase();
        const bText = $(b).children('td').eq(col).text().trim().toLowerCase();
        return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });
      $.each(rows, (_: number, row: HTMLTableRowElement) => $tbody.append(row));
    });
  }

  ngOnDestroy(): void {
    this.$el?.find('th[data-sort]').off('.tableSort');
  }
}
