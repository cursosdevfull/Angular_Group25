import { Component, effect, Inject, inject, signal, ViewEncapsulation } from '@angular/core';
import { form, FormField, minLength, required, SchemaPathTree } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Course, TCourseUseCasesPort } from '../../../domain';
import { COURSE_USE_CASES_PORT, provideCourse } from '../../../course.di';
import { LEVEL } from '../../../../../core/types';
import { Notifications } from 'cursosdev_angular25';
import { MatSelectModule } from '@angular/material/select';

interface ICourse {
  id?: number;
  name: string;
  level: string;
}

@Component({
  selector: 'cdev-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormField, MatDialogModule, MatToolbarModule, MatIconModule, MatSelectModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  encapsulation: ViewEncapsulation.None,
  providers: provideCourse()
})
export class Form {
  data = inject(MAT_DIALOG_DATA)
  reference: MatDialogRef<Form> = inject(MatDialogRef);

  model = signal<ICourse>({
    id: this.data && this.data.id ? this.data.id : undefined,
    name: this.data && this.data.name ? this.data.name : '',
    level: this.data && this.data.level ? this.data.level : ''
  })

  schema = (schema: SchemaPathTree<ICourse>) => {
    required(schema.name, { message: 'Name is required' })
    required(schema.level, { message: 'Level is required' })
    minLength(schema.name, 3, { message: 'Name must be at least 3 characters' })
    minLength(schema.level, 3, { message: 'Level must be at least 3 characters' })
  }

  courseForm = form(this.model, this.schema)

  notifier = inject(Notifications)

  constructor(@Inject(COURSE_USE_CASES_PORT) private readonly usecase: TCourseUseCasesPort) {
    effect(() => {
      const responseUpdate = this.usecase.responseUpdate();
      const responseCreate = this.usecase.responseCreate();
      if (responseUpdate && 'id' in responseUpdate) {
        this.notifier.info('Course updated successfully');
      } else if (responseUpdate && 'message' in responseUpdate) {
        this.notifier.info(`Error updating course: ${responseUpdate.message}`);
      }

      if (responseCreate && 'id' in responseCreate) {
        this.notifier.info('Course created successfully');
      } else if (responseCreate && 'message' in responseCreate) {
        this.notifier.info(`Error creating course: ${responseCreate.message}`);
      }

      if (responseUpdate || responseCreate) {
        this.reference.close(true);
      }

    })
  }

  save() {
    if (this.courseForm().valid()) {
      const props = this.courseForm().value();
      if (props.id) {
        const course = new Course({ id: props.id, name: props.name, level: props.level as LEVEL });
        this.usecase.courseUpdate.set(course)
      } else {
        const course = new Course({ name: props.name, level: props.level as LEVEL });
        this.usecase.courseCreate.set(course)
      }
    }
  }

}
