import { Component, effect, inject, Inject, Injector, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Confirm, Paginator, Table } from 'cursosdev_angular25';
import { COURSE_USE_CASES_PORT } from '../../../course.di';
import { CourseData, TCourseUseCasesPort } from '../../../domain';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cdev-course',
  imports: [Table, MatIconModule, MatTableModule, Paginator, MatButtonModule],
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
  confirmService = inject(Confirm);

  constructor(@Inject(COURSE_USE_CASES_PORT) private readonly usecase: TCourseUseCasesPort) {
    effect(() => {
      const response = this.usecase.responseGetByPage();
      if (response && 'data' in response) {
        this.data.set(response.data);
        this.totalItems = response.pagination.total;
      }
    })

    effect(() => {
      const condition01 = this.usecase.courseDataUpdated()
      const condition02 = this.usecase.courseRefresh();
      const condition03 = this.usecase.responseDelete();

      if (!!condition01 || !!condition02 || !!condition03) {
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

  deleteRow(event: Event, row: any) {
    event.stopPropagation();

    const reference = this.confirmService.confirm(`Are you sure you want to delete the course "${row.name}"?`);

    reference.subscribe((result) => {
      if (result) {
        this.usecase.courseDelete.set(row.id);
      }
    });
  }
}
