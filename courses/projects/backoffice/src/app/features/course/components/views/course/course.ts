import { Component, effect, inject, Inject, Injector, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Paginator, Table } from 'lib';
import { COURSE_USE_CASES_PORT } from '../../../course.di';
import { CourseData, TCourseUseCasesPort } from '../../../domain';

@Component({
  selector: 'cdev-course',
  imports: [Table, MatIconModule, MatTableModule, Paginator],
  templateUrl: './course.html',
  styleUrl: './course.scss',
})
export class Course {
  onSelectedRow = output<any>();

  totalItems = 0;

  currentPage = 0;

  data = signal<CourseData[]>([]);

  metaColumns = [
    { label: 'Course Name', field: 'name' },
    { label: 'Difficulty Level', field: 'level' },
  ];

  injector = inject(Injector);

  constructor(@Inject(COURSE_USE_CASES_PORT) private readonly usecase: TCourseUseCasesPort) {
    effect(() => {
      const response = this.usecase.responseGetByPage();
      if (response && 'data' in response) {
        this.data.set(response.data);
        this.totalItems = response.pagination.total;
      }
    })

    effect(() => {
      const update = this.usecase.courseDataUpdated()

      if (update) {
        this.loadDataByPage(this.currentPage);
      }
    })

    this.loadDataByPage(this.currentPage);
  }


  loadDataByPage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.usecase.courseGetByPage.set({ page: pageIndex, limit: 20 });
  }

  selectedRow(row: any) {
    this.onSelectedRow.emit(row);
  }
}
