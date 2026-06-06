import { Observable } from "rxjs";
import { PAGINATION } from "../../../core/types/pagination";
import { Schedule, ScheduleData, TSchedulePort } from "../domain";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { env } from "../../../core/environments/environment";

export class ScheduleAdapter implements TSchedulePort {
    private http = inject(HttpClient);

    create(schedule: Schedule): Observable<ScheduleData | { message: string; }> {
        return this.http.post<ScheduleData | { message: string }>(`${env.API_URL}/api/schedules`, schedule.properties);
    }

    update(schedule: Schedule): Observable<ScheduleData | { message: string; }> {
        const props = schedule.properties;
        return this.http.put<ScheduleData | { message: string }>(`${env.API_URL}/api/schedules/${props.id}`, props);
    }

    delete(id: number): Observable<void | { message: string; }> {
        return this.http.delete<void | { message: string }>(`${env.API_URL}/api/schedules/${id}`);
    }

    getAll(): Observable<ScheduleData[] | { message: string; }> {
        return this.http.get<ScheduleData[] | { message: string }>(`${env.API_URL}/api/schedules`);
    }

    getByPage(page: number, limit: number): Observable<PAGINATION<ScheduleData> | { message: string; }> {
        return this.http.get<PAGINATION<ScheduleData> | { message: string }>(`${env.API_URL}/api/schedules/pagination?page=${page}&limit=${limit}`);
    }

    getById(id: number): Observable<ScheduleData | { message: string; }> {
        return this.http.get<ScheduleData | { message: string }>(`${env.API_URL}/api/schedules/${id}`);
    }
}