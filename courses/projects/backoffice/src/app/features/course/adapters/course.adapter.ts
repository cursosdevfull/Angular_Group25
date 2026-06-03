import { Observable } from "rxjs";
import { PAGINATION } from "../../../core/types/pagination";
import { Course, CourseData, TCoursePort } from "../domain";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { env } from "../../../core/environments/environment";

export class CourseAdapter implements TCoursePort {
    private http = inject(HttpClient);

    create(course: Course): Observable<CourseData | { message: string; }> {
        return this.http.post<CourseData | { message: string }>(`${env.API_URL}/api/courses`, course.properties);
    }
    update(course: Course): Observable<CourseData | { message: string; }> {
        const props = course.properties;
        return this.http.put<CourseData | { message: string }>(`${env.API_URL}/api/courses/${props.id}`, props);
    }
    delete(id: number): Observable<void | { message: string; }> {
        return this.http.delete<void | { message: string }>(`${env.API_URL}/api/courses/${id}`);
    }
    getAll(): Observable<CourseData[] | { message: string; }> {
        return this.http.get<CourseData[] | { message: string }>(`${env.API_URL}/api/courses`);
    }
    getByPage(page: number, limit: number): Observable<PAGINATION<CourseData> | { message: string; }> {
        return this.http.get<PAGINATION<CourseData> | { message: string }>(`${env.API_URL}/api/courses/pagination?page=${page}&limit=${limit}`);
    }
    getById(id: number): Observable<CourseData | { message: string; }> {
        return this.http.get<CourseData | { message: string }>(`${env.API_URL}/api/courses/${id}`);
    }
}