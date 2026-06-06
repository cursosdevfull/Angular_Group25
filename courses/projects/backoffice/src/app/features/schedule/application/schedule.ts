import { computed, signal } from "@angular/core";
import { Schedule, ScheduleData, TSchedulePort, TScheduleUseCasesPort } from "../domain";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { map, switchMap, of } from "rxjs";
import { PAGINATION } from "../../../core/types/pagination";

export class ScheduleApplication implements TScheduleUseCasesPort {
    // Create schedule
    scheduleCreate = signal<Schedule | null>(null);
    private _scheduleCreate = toObservable<Schedule | null>(this.scheduleCreate)
        .pipe(
            switchMap(schedule => {
                if (schedule) {
                    return this.port.create(schedule);
                }
                return of(null);
            })
        );

    responseCreate = toSignal<ScheduleData | { message: string } | null>(this._scheduleCreate, { initialValue: null });

    // Update schedule
    scheduleUpdate = signal<Schedule | null>(null)

    private _scheduleUpdate = toObservable<Schedule | null>(this.scheduleUpdate)
        .pipe(
            switchMap(schedule => {
                if (schedule) {
                    return this.port.update(schedule);
                }
                return of(null);
            })
        );

    responseUpdate = toSignal<ScheduleData | { message: string } | null>(this._scheduleUpdate, { initialValue: null });

    // Delete schedule
    scheduleDelete = signal<number | null>(null)
    private _scheduleDelete = toObservable<number | null>(this.scheduleDelete)
        .pipe(
            switchMap(scheduleId => {
                if (scheduleId) {
                    return this.port.delete(scheduleId).pipe(
                        map((response) => response ?? { message: 'Schedule deleted' })
                    );
                } return of(null);
            })
        );

    responseDelete = toSignal<void | { message: string } | null>(this._scheduleDelete, { initialValue: null });

    // Get by id
    scheduleGetById = signal<number | null>(null);
    private _scheduleGetById = toObservable<number | null>(this.scheduleGetById)
        .pipe(
            switchMap(scheduleId => {
                if (scheduleId) {
                    return this.port.getById(scheduleId);
                } return of(null);
            })
        );

    responseGetById = toSignal<ScheduleData | { message: string } | null>(this._scheduleGetById, { initialValue: null });

    // Get all schedules
    scheduleGetAll = signal<null>(null);
    private _scheduleGetAll = toObservable<null>(this.scheduleGetAll)
        .pipe(
            switchMap((value) => {
                if (value) {
                    return this.port.getAll();
                }
                return of([])
            })
        );

    responseGetAll = toSignal<ScheduleData[] | { message: string } | null>(this._scheduleGetAll, { initialValue: null });

    // Get schedules by page
    scheduleGetByPage = signal<{ page: number, limit: number } | null>(null);
    private _scheduleGetByPage = toObservable<{ page: number, limit: number } | null>(this.scheduleGetByPage)
        .pipe(
            switchMap(params => {
                if (params) {
                    return this.port.getByPage(params.page, params.limit);
                }
                return of(null);
            })
        );

    responseGetByPage = toSignal<PAGINATION<ScheduleData> | { message: string } | null>(this._scheduleGetByPage, { initialValue: null });

    scheduleDataUpdated = computed(() => {
        const condition = !!this.responseDelete() || !!this.responseUpdate() || !!this.responseCreate();

        if (condition) {
            return Math.random()
        }

        return null;
    });

    scheduleRefresh = signal<number | null>(null);

    constructor(private readonly port: TSchedulePort) { }
}