import { Component, inject } from '@angular/core';
import { Container, Title } from 'lib';
import { Course } from '../../views/course/course';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Modal } from '../../../../../core/services/modal';
import { Form } from '../..';

@Component({
  selector: 'cdev-page-course',
  imports: [Title, Container, Course, MatButtonModule, MatIconModule],
  templateUrl: './page-course.html',
  styleUrl: './page-course.scss',
})
export class PageCourse {
  modal = inject(Modal)

  openForm(row: any = null) {
    const ref = this.modal.open(Form, { data: row, panelClass: 'course-modal', disableClose: true })

    ref.afterClosed().subscribe(result => {
      if (result) {
        //alert("Course saved successfully"); // Handle any actions after the modal is closed, if needed
      }
    });
  }
}
