import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  @Input() user!: IUser;
  @Input() index!: number;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  @Output() onEdit: EventEmitter<IUser> = new EventEmitter();
  /*   @Input() name!: string;
  @Input() lastname!: string;
  @Input() email!: string;
  @Input() age!: number; */

  ngOnChanges() {
    console.log('UserDetail - ngOnChanges', this.user);
  }

  delete(event: Event) {
    event.stopPropagation();
    this.onDelete.emit(this.index);
  }

  edit() {
    this.onEdit.emit(this.user);
  }
}
