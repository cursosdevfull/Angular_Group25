import { Signal, WritableSignal } from "@angular/core";
import { Course } from "./course";
import { CourseData } from "./course.data";
import { PAGINATION } from "../../../core/types/pagination";

export type TCourseUseCasesPort = {
    courseCreate: WritableSignal<Course | null>,
    responseCreate: Signal<CourseData | { message: string } | null>

    courseUpdate: WritableSignal<Course | null>,
    responseUpdate: Signal<CourseData | { message: string } | null>

    courseDelete: WritableSignal<number | null>,
    responseDelete: Signal<void | { message: string } | null>

    courseGetById: WritableSignal<number | null>,
    responseGetById: Signal<CourseData | { message: string } | null>

    courseGetAll: WritableSignal<null>,
    responseGetAll: Signal<CourseData[] | { message: string } | null>

    courseGetByPage: WritableSignal<{ page: number, limit: number } | null>,
    responseGetByPage: Signal<PAGINATION<CourseData> | { message: string } | null>

    courseDataUpdated: Signal<boolean>
}