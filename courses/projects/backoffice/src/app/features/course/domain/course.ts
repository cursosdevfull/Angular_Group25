import { LEVEL } from "../../../core/types";

export type CourseRequiredProps = {
    name: string;
    level: LEVEL;
}

export type CourseOptionalProps = {
    id: number;
}

export type CourseProps = CourseRequiredProps & Partial<CourseOptionalProps>;

export class Course {
    private readonly id?: number;
    private name: string;
    private level: LEVEL;

    constructor(props: CourseProps) {
        if (props.id) this.id = props.id;

        if (props.name.length < 3) {
            throw new Error('Course name must be at least 3 characters long');
        }

        if (!['Beginner', 'Intermediate', 'Advanced'].includes(props.level)) {
            throw new Error('Invalid course level');
        }

        this.name = props.name;
        this.level = props.level;
    }

    get properties() {
        return {
            id: this.id,
            name: this.name,
            level: this.level,
        };
    }

    update(props: Partial<CourseRequiredProps>) {
        if (props.name && props.name.length < 3) {
            throw new Error('Course name must be at least 3 characters long');
        } else if (props.name && props.name.length >= 3) {
            this.name = props.name;
        }

        if (props.level && !['Beginner', 'Intermediate', 'Advanced'].includes(props.level)) {
            throw new Error('Invalid course level');
        } else if (props.level && ['Beginner', 'Intermediate', 'Advanced'].includes(props.level)) {
            this.level = props.level;
        }
    }
}