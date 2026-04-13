import { Component, Input } from '@angular/core';
import { IColumn } from '../interfaces/column';

@Component({
  selector: 'app-user-title',
  imports: [],
  templateUrl: './user-title.html',
  styleUrl: './user-title.scss',
})
export class UserTitle {
  @Input() columns: IColumn[] = [];
}
