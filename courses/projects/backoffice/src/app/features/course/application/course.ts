import { computed, signal } from "@angular/core";
import { Course, CourseData, TCoursePort, TCourseUseCasesPort } from "../domain";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { map, switchMap, of } from "rxjs";
import { PAGINATION } from "../../../core/types/pagination";

export class CourseApplication implements TCourseUseCasesPort {
    // Create course
    courseCreate = signal<Course | null>(null);
    private _courseCreate = toObservable<Course | null>(this.courseCreate)
        .pipe(
            switchMap(course => {
                if (course) {
                    return this.port.create(course);
                }
                return of(null);
            })
        );

    responseCreate = toSignal<CourseData | { message: string } | null>(this._courseCreate, { initialValue: null });

    // Update course
    courseUpdate = signal<Course | null>(null)

    private _courseUpdate = toObservable<Course | null>(this.courseUpdate)
        .pipe(
            switchMap(course => {
                if (course) {
                    return this.port.update(course);
                }
                return of(null);
            })
        );

    responseUpdate = toSignal<CourseData | { message: string } | null>(this._courseUpdate, { initialValue: null });

    // Delete course
    courseDelete = signal<number | null>(null)
    private _courseDelete = toObservable<number | null>(this.courseDelete)
        .pipe(
            switchMap(courseId => {
                if (courseId) {
                    return this.port.delete(courseId).pipe(
                        map((response) => response ?? { message: 'Course deleted' })
                    );
                } return of(null);
            })
        );

    responseDelete = toSignal<void | { message: string } | null>(this._courseDelete, { initialValue: null });

    // Get by id
    courseGetById = signal<number | null>(null);
    private _courseGetById = toObservable<number | null>(this.courseGetById)
        .pipe(
            switchMap(courseId => {
                if (courseId) {
                    return this.port.getById(courseId);
                } return of(null);
            })
        );

    responseGetById = toSignal<CourseData | { message: string } | null>(this._courseGetById, { initialValue: null });

    // Get all courses
    courseGetAll = signal<null>(null);
    private _courseGetAll = toObservable<null>(this.courseGetAll)
        .pipe(
            switchMap((value) => {
                if (value) {
                    return this.port.getAll();
                }
                return of([])
            })
        );

    responseGetAll = toSignal<CourseData[] | { message: string } | null>(this._courseGetAll, { initialValue: null });

    // Get courses by page
    courseGetByPage = signal<{ page: number, limit: number } | null>(null);
    private _courseGetByPage = toObservable<{ page: number, limit: number } | null>(this.courseGetByPage)
        .pipe(
            switchMap(params => {
                if (params) {
                    return this.port.getByPage(params.page, params.limit);
                }
                return of(null);
            })
        );

    responseGetByPage = toSignal<PAGINATION<CourseData> | { message: string } | null>(this._courseGetByPage, { initialValue: null });

    courseDataUpdated = computed(() => {
        const condition = !!this.responseDelete() || !!this.responseUpdate() || !!this.responseCreate();

        if (condition) {
            return Math.random()
        }

        return null;
    });

    courseRefresh = signal<number | null>(null);

    constructor(private readonly port: TCoursePort) { }

}