import { Injectable } from '@angular/core';
declare var $: any;
declare var bootstrap: any;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private containerId = 'adminToastContainer';

  private ensureContainer(): void {
    if (document.getElementById(this.containerId)) return;
    $('body').append(
      `<div id="${this.containerId}" class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:1090"></div>`
    );
  }

  show(message: string, kind: 'success' | 'danger' | 'info' = 'success'): void {
    this.ensureContainer();
    const id = 'toast-' + Date.now();
    const bg = kind === 'success' ? 'text-bg-success' : kind === 'danger' ? 'text-bg-danger' : 'text-bg-info';
    const html = `
      <div id="${id}" class="toast ${bg}" role="alert">
        <div class="d-flex">
          <div class="toast-body">${$('<span>').text(message).html()}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>`;
    $(`#${this.containerId}`).append(html);
    const toastEl = document.getElementById(id)!;
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
    bsToast.show();
    $(toastEl).on('hidden.bs.toast', () => $(toastEl).remove());
  }
}
