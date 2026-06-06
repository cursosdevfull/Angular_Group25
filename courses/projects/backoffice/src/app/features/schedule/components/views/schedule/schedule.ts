import { Component, effect, inject, Inject, Injector, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Confirm, MetaColumns, Paginator, Table } from 'cursosdev_angular25';
import { SCHEDULE_USE_CASES_PORT } from '../../../schedule.di';
import { ScheduleData, TScheduleUseCasesPort } from '../../../domain';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'cdev-schedule',
    imports: [Table, MatIconModule, MatTableModule, Paginator, MatButtonModule],
    templateUrl: './schedule.html',
    styleUrl: './schedule.scss',
})
export class Schedule {
    onSelectedRow = output<any>();

    totalItems = 0;

    currentPage = 0;

    data = signal<ScheduleData[]>([]);

    metaColumns: MetaColumns<ScheduleData> = [
        { label: 'Title', field: 'title' },
        { label: 'Start Date', field: 'dateStart', valueFn: (row) => new Date(row.dateStart).toLocaleDateString("es-PE") },
        { label: 'Duration (min)', field: 'duration' },
        { label: 'Price', field: 'price', valueFn: (row) => `US$ ${row.price}` },
        { label: 'Course', field: 'courseName' },
    ];

    injector = inject(Injector);
    confirmService = inject(Confirm);

    constructor(@Inject(SCHEDULE_USE_CASES_PORT) private readonly usecase: TScheduleUseCasesPort) {
        effect(() => {
            const response = this.usecase.responseGetByPage();
            if (response && 'data' in response) {
                this.data.set(response.data);
                this.totalItems = response.pagination.total;
            }
        })

        effect(() => {
            const condition01 = this.usecase.scheduleDataUpdated();
            const condition02 = this.usecase.scheduleRefresh();
            const condition03 = this.usecase.responseDelete();

            if (!!condition01 || !!condition02 || !!condition03) {
                this.loadDataByPage(this.currentPage);
            }
        })

        this.loadDataByPage(this.currentPage);
    }

    loadDataByPage(pageIndex: number) {
        this.currentPage = pageIndex;
        this.usecase.scheduleGetByPage.set({ page: pageIndex, limit: 20 });
    }

    selectedRow(row: any) {
        this.onSelectedRow.emit(row);
    }

    deleteRow(event: Event, row: any) {
        event.stopPropagation();

        const reference = this.confirmService.confirm(`Are you sure you want to delete the schedule "${row.title}"?`);

        reference.subscribe((result) => {
            if (result) {
                this.usecase.scheduleDelete.set(row.id);
            }
        });
    }
}