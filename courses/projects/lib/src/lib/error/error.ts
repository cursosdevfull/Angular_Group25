import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'cdev-lib-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
  encapsulation: ViewEncapsulation.None
})
export class Error {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: string) {
    this.message = data;
  }
}
