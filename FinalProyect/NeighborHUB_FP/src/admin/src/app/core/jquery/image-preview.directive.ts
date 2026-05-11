import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;

@Directive({ selector: '[appImagePreview]', standalone: true })
export class ImagePreviewDirective implements AfterViewInit, OnDestroy {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    $(this.el.nativeElement).on('change.imgPreview', (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const $preview = $(this.el.nativeElement).siblings('.img-preview');
        if ($preview.length) {
          $preview.attr('src', ev.target?.result as string).show();
        }
      };
      reader.readAsDataURL(file);
    });
  }

  ngOnDestroy(): void {
    $(this.el.nativeElement).off('.imgPreview');
  }
}
