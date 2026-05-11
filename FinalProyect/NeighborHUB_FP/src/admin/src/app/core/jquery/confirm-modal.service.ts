import { Injectable } from '@angular/core';
declare var $: any;
declare var bootstrap: any;

@Injectable({ providedIn: 'root' })
export class ConfirmModalService {
  private modalEl: HTMLElement | null = null;
  private bsModal: any = null;
  private resolver: ((ok: boolean) => void) | null = null;

  private ensure(): void {
    if (this.modalEl) return;
    const html = `
      <div class="modal fade" id="adminConfirmModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Confirm</h5></div>
            <div class="modal-body"><p id="confirmMsg"></p></div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-action="cancel">Cancel</button>
              <button class="btn btn-danger" data-action="confirm">Confirm</button>
            </div>
          </div>
        </div>
      </div>`;
    $('body').append(html);
    this.modalEl = document.getElementById('adminConfirmModal')!;
    this.bsModal = new bootstrap.Modal(this.modalEl);

    $(this.modalEl).on('click', '[data-action]', (e: any) => {
      const action = $(e.currentTarget).data('action');
      this.bsModal.hide();
      this.resolver?.(action === 'confirm');
      this.resolver = null;
    });
    $(this.modalEl).on('hidden.bs.modal', () => {
      if (this.resolver) { this.resolver(false); this.resolver = null; }
    });
  }

  ask(message: string): Promise<boolean> {
    this.ensure();
    $('#confirmMsg').text(message);
    this.bsModal.show();
    return new Promise((resolve) => { this.resolver = resolve; });
  }
}
