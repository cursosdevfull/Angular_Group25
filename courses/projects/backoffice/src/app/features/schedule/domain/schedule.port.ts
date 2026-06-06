import { Observable } from "rxjs";
import { Schedule } from "./schedule";
import { ScheduleData } from "./schedule.data";
import { PAGINATION } from "../../../core/types/pagination";

export type TSchedulePort = {
    create(schedule: Schedule): Observable<ScheduleData | { message: string }>;
    update(schedule: Schedule): Observable<ScheduleData | { message: string }>;
    delete(id: number): Observable<void | { message: string }>;
    getAll(): Observable<ScheduleData[] | { message: string }>;
    getByPage(page: number, limit: number): Observable<PAGINATION<ScheduleData> | { message: string }>;
    getById(id: number): Observable<ScheduleData | { message: string }>;
}