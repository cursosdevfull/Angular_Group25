import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface TitleProps {
  title: string;
  icon: string
}

@Component({
  selector: 'cdev-lib-title',
  imports: [MatIconModule],
  templateUrl: './title.html',
  styleUrl: './title.css',
})
export class Title {
  props = input<TitleProps>();
}
