import { InjectionToken, Provider } from "@angular/core";
import { TSchedulePort } from "./domain";
import { ScheduleAdapter } from "./adapters/schedule.adapter";
import { ScheduleApplication } from "./application";

export const SCHEDULE_PORT = new InjectionToken<TSchedulePort>('SCHEDULE_PORT');
export const SCHEDULE_USE_CASES_PORT = new InjectionToken<ScheduleApplication>('SCHEDULE_USE_CASES_PORT');

export const provideSchedule = (): Provider[] => [
    { provide: SCHEDULE_PORT, useClass: ScheduleAdapter },
    {
        provide: SCHEDULE_USE_CASES_PORT,
        useFactory: (port: TSchedulePort) => new ScheduleApplication(port),
        deps: [SCHEDULE_PORT]
    }
]