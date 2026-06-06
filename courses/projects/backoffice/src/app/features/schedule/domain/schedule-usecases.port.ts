import { Signal, WritableSignal } from "@angular/core";
import { Schedule } from "./schedule";
import { ScheduleData } from "./schedule.data";
import { PAGINATION } from "../../../core/types/pagination";

export type TScheduleUseCasesPort = {
    scheduleCreate: WritableSignal<Schedule | null>,
    responseCreate: Signal<ScheduleData | { message: string } | null>

    scheduleUpdate: WritableSignal<Schedule | null>,
    responseUpdate: Signal<ScheduleData | { message: string } | null>

    scheduleDelete: WritableSignal<number | null>,
    responseDelete: Signal<void | { message: string } | null>

    scheduleGetById: WritableSignal<number | null>,
    responseGetById: Signal<ScheduleData | { message: string } | null>

    scheduleGetAll: WritableSignal<null>,
    responseGetAll: Signal<ScheduleData[] | { message: string } | null>

    scheduleGetByPage: WritableSignal<{ page: number, limit: number } | null>,
    responseGetByPage: Signal<PAGINATION<ScheduleData> | { message: string } | null>

    scheduleDataUpdated: Signal<number | null>

    scheduleRefresh: WritableSignal<number | null>
}