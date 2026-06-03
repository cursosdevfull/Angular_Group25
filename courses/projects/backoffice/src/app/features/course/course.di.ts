import { InjectionToken, Provider } from "@angular/core";
import { TCoursePort } from "./domain";
import { CourseAdapter } from "./adapters/course.adapter";
import { CourseApplication } from "./application";

export const COURSE_PORT = new InjectionToken<TCoursePort>('COURSE_PORT');
export const COURSE_USE_CASES_PORT = new InjectionToken<CourseApplication>('COURSE_USE_CASES_PORT');

export const provideCourse = (): Provider[] => [
    { provide: COURSE_PORT, useClass: CourseAdapter },
    {
        provide: COURSE_USE_CASES_PORT, useFactory: (port: TCoursePort) => new CourseApplication(port),
        deps: [COURSE_PORT]
    }
]