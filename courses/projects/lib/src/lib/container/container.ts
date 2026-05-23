import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'cdev-lib-container',
  imports: [MatCardModule],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container {
  css = input<string>();
}
