import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({ providedIn: 'root' })
export class CsvDownloadService {
  download(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const $link = $('<a>')
      .attr('href', url)
      .attr('download', filename)
      .css('display', 'none');
    $('body').append($link);
    $link[0].click();
    $link.remove();
    URL.revokeObjectURL(url);
  }
}
