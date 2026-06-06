import { Component, Inject, inject } from '@angular/core';
import { Container, Notifications, Title } from 'cursosdev_angular25';
import { Course } from '../../views/course/course';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Modal } from '../../../../../core/services/modal';
import { Form } from '../..';
import { TCourseUseCasesPort } from '../../../domain';
import { COURSE_USE_CASES_PORT } from '../../../course.di';

@Component({
  selector: 'cdev-page-course',
  imports: [Title, Container, Course, MatButtonModule, MatIconModule],
  templateUrl: './page-course.html',
  styleUrl: './page-course.scss',
})
export class PageCourse {
  modal = inject(Modal)
  notifier = inject(Notifications)

  constructor(@Inject(COURSE_USE_CASES_PORT) private readonly usecase: TCourseUseCasesPort) { }

  openForm(row: any = null) {
    const ref = this.modal.open(Form, { data: row, panelClass: 'course-modal', disableClose: true })

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.usecase.courseRefresh.set(Date.now());
        this.notifier.info('Course list refreshed');
      }
    });
  }
}
