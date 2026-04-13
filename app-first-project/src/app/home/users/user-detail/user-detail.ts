import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  @Input() name!: string;
  @Input() lastname!: string;
  @Input() email!: string;
  @Input() age!: number;
}
