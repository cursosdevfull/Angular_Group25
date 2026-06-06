import { HttpClient } from '@angular/common/http';
import { Component, effect, Inject, inject, signal, ViewEncapsulation } from '@angular/core';
import { form, FormField, minLength, required, SchemaPathTree } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Schedule, TScheduleUseCasesPort } from '../../../domain';
import { provideSchedule, SCHEDULE_USE_CASES_PORT } from '../../../schedule.di';
import { DateTimePicker, Notifications } from 'cursosdev_angular25';
import { MatSelectModule } from '@angular/material/select';
import { env } from '../../../../../core/environments/environment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

interface ISchedule {
    id?: number;
    title: string;
    dateStart: string;
    duration: number | null;
    price: number | null;
    courseId: number | null;
}

type CourseOption = {
    id: number;
    name: string;
}

@Component({
    selector: 'cdev-schedule-form',
    imports: [MatTimepickerModule, MatDatepickerModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormField, MatDialogModule, MatToolbarModule, MatIconModule, MatSelectModule, DateTimePicker],
    templateUrl: './form.html',
    styleUrl: './form.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [...provideSchedule(), provideNativeDateAdapter()]
})
export class Form {
    data = inject(MAT_DIALOG_DATA)
    reference: MatDialogRef<Form> = inject(MatDialogRef);
    notifier = inject(Notifications)
    private http = inject(HttpClient);

    courses = signal<CourseOption[]>([]);

    model = signal<ISchedule>({
        id: this.data && this.data.id ? this.data.id : undefined,
        title: this.data && this.data.title ? this.data.title : '',
        dateStart: this.data && this.data.dateStart ? this.toDatetimeLocal(this.data.dateStart) : '',
        duration: this.data && this.data.duration ? this.data.duration : null,
        price: this.data && this.data.price !== undefined ? this.data.price : null,
        courseId: this.data && this.data.courseId ? this.data.courseId : null
    })

    schema = (schema: SchemaPathTree<ISchedule>) => {
        required(schema.title, { message: 'Title is required' })
        required(schema.dateStart, { message: 'Start date is required' })
        required(schema.duration, { message: 'Duration is required' })
        required(schema.price, { message: 'Price is required' })
        required(schema.courseId, { message: 'Course is required' })
        minLength(schema.title, 3, { message: 'Title must be at least 3 characters' })
    }

    scheduleForm = form(this.model, this.schema)

    constructor(@Inject(SCHEDULE_USE_CASES_PORT) private readonly usecase: TScheduleUseCasesPort) {
        this.loadCourses();

        effect(() => {
            const responseUpdate = this.usecase.responseUpdate();
            const responseCreate = this.usecase.responseCreate();

            if (responseUpdate && 'id' in responseUpdate) {
                this.notifier.info('Schedule updated successfully');
            } else if (responseUpdate && 'message' in responseUpdate) {
                this.notifier.info(`Error updating schedule: ${responseUpdate.message}`);
            }

            if (responseCreate && 'id' in responseCreate) {
                this.notifier.info('Schedule created successfully');
            } else if (responseCreate && 'message' in responseCreate) {
                this.notifier.info(`Error creating schedule: ${responseCreate.message}`);
            }

            if (responseUpdate || responseCreate) {
                this.reference.close(true);
            }
        })
    }

    save() {
        if (this.scheduleForm().valid()) {
            const props = this.scheduleForm().value();
            const duration = Number(props.duration);
            const price = Number(props.price);
            const courseId = Number(props.courseId);

            if (!Number.isInteger(duration) || duration <= 0) {
                this.notifier.info('Duration must be a positive integer');
                return;
            }

            if (Number.isNaN(price) || price < 0) {
                this.notifier.info('Price must be zero or greater');
                return;
            }

            if (!Number.isInteger(courseId) || courseId <= 0) {
                this.notifier.info('You must select a valid course');
                return;
            }

            if (props.id) {
                const schedule = new Schedule({
                    id: props.id,
                    title: props.title,
                    dateStart: props.dateStart,
                    duration,
                    price,
                    courseId
                });
                this.usecase.scheduleUpdate.set(schedule)
            } else {
                const schedule = new Schedule({
                    title: props.title,
                    dateStart: props.dateStart,
                    duration,
                    price,
                    courseId
                });
                this.usecase.scheduleCreate.set(schedule)
            }
        }
    }

    private loadCourses() {
        this.http.get<CourseOption[] | { message: string }>(`${env.API_URL}/api/courses`)
            .subscribe((response) => {
                if (Array.isArray(response)) {
                    this.courses.set(response);
                    return;
                }

                this.notifier.info(`Error loading courses: ${response.message}`);
            });
    }

    private toDatetimeLocal(date: string): string {
        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return '';
        }

        const offset = parsedDate.getTimezoneOffset() * 60000;
        return new Date(parsedDate.getTime() - offset).toISOString().slice(0, 16);
    }
}