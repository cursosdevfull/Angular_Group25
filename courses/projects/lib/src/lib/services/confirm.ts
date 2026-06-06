import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModal } from '../confirm/confirm';


@Injectable({
  providedIn: 'root',
})
export class Confirm {
  private modal = inject(MatDialog);

  confirm(message: string) {
    const dialogRef = this.modal.open(ConfirmModal);
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
