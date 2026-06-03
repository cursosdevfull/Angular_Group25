import { Observable } from "rxjs";
import { Course } from "./course";
import { CourseData } from "./course.data";
import { PAGINATION } from "../../../core/types/pagination";

export type TCoursePort = {
    create(course: Course): Observable<CourseData | { message: string }>;
    update(course: Course): Observable<CourseData | { message: string }>;
    delete(id: number): Observable<void | { message: string }>;
    getAll(): Observable<CourseData[] | { message: string }>;
    getByPage(page: number, limit: number): Observable<PAGINATION<CourseData> | { message: string }>;
    getById(id: number): Observable<CourseData | { message: string }>;
}