import { Component, Inject, inject } from '@angular/core';
import { Container, Notifications, Title } from 'cursosdev_angular25';
import { Schedule } from '../../views/schedule/schedule';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Modal } from '../../../../../core/services/modal';
import { Form } from '../..';
import { TScheduleUseCasesPort } from '../../../domain';
import { SCHEDULE_USE_CASES_PORT } from '../../../schedule.di';

@Component({
    selector: 'cdev-page-schedule',
    imports: [Title, Container, Schedule, MatButtonModule, MatIconModule],
    templateUrl: './page-schedule.html',
    styleUrl: './page-schedule.scss',
})
export class PageSchedule {
    modal = inject(Modal)
    notifier = inject(Notifications)

    constructor(@Inject(SCHEDULE_USE_CASES_PORT) private readonly usecase: TScheduleUseCasesPort) { }

    openForm(row: any = null) {
        const ref = this.modal.open(Form, { data: row, panelClass: 'schedule-modal', disableClose: true })

        ref.afterClosed().subscribe(result => {
            if (result) {
                this.usecase.scheduleRefresh.set(Date.now());
                this.notifier.info('Schedule list refreshed');
            }
        });
    }
}