import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class Modal {
  modal = inject(MatDialog)

  open(component: any, config?: MatDialogConfig) {
    return this.modal.open(component, config);
  }
}
