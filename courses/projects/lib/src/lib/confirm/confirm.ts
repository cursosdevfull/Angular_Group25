import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'cdev-lib-confirm',
  imports: [MatDialogModule, MatToolbarModule, MatButtonModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css',
})
export class ConfirmModal {
  message: string = 'Are you sure?';
}
