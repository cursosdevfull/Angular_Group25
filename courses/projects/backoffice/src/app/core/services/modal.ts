import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class Modal {
  modal = inject(MatDialog)

  open(component: any, data?: any) {
    this.modal.open(component, { data })
  }
}
