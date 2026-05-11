import { Directive, ElementRef, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';
declare var $: any;

@Directive({ selector: '[appFormFeedback]', standalone: true })
export class FormFeedbackDirective implements AfterViewInit, OnDestroy {
  @Input() appFormFeedback = '';
  private sub?: { unsubscribe(): void };

  constructor(private el: ElementRef, private ctrl: NgControl) {}

  ngAfterViewInit(): void {
    this.sub = this.ctrl.statusChanges?.subscribe(() => this.update());
  }

  private update(): void {
    const $el = $(this.el.nativeElement);
    if (this.ctrl.touched && this.ctrl.invalid) {
      $el.addClass('is-invalid').removeClass('is-valid');
    } else if (this.ctrl.touched && this.ctrl.valid) {
      $el.removeClass('is-invalid').addClass('is-valid');
    } else {
      $el.removeClass('is-invalid is-valid');
    }
  }

  static scrollToFirstError(formEl: HTMLElement): void {
    const $invalid = $(formEl).find('.is-invalid').first();
    if ($invalid.length) {
      $('html, body').animate({ scrollTop: $invalid.offset().top - 100 }, 300);
      $invalid.trigger('focus');
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
