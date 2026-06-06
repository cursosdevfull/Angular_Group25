export type ScheduleRequiredProps = {
    title: string;
    dateStart: string;
    duration: number;
    price: number;
    courseId: number;
}

export type ScheduleOptionalProps = {
    id: number;
}

export type ScheduleProps = ScheduleRequiredProps & Partial<ScheduleOptionalProps>;

export class Schedule {
    private readonly id?: number;
    private title: string;
    private dateStart: string;
    private duration: number;
    private price: number;
    private courseId: number;

    constructor(props: ScheduleProps) {
        if (props.id) this.id = props.id;

        if (props.title.trim().length < 3) {
            throw new Error('Schedule title must be at least 3 characters long');
        }

        if (Number.isNaN(Date.parse(props.dateStart))) {
            throw new Error('Invalid start date');
        }

        if (!Number.isInteger(props.duration) || props.duration <= 0) {
            throw new Error('Duration must be a positive integer');
        }

        if (props.price < 0) {
            throw new Error('Price must be zero or greater');
        }

        if (!Number.isInteger(props.courseId) || props.courseId <= 0) {
            throw new Error('Invalid course id');
        }

        this.title = props.title.trim();
        this.dateStart = props.dateStart;
        this.duration = props.duration;
        this.price = props.price;
        this.courseId = props.courseId;
    }

    get properties() {
        return {
            id: this.id,
            title: this.title,
            dateStart: this.dateStart,
            duration: this.duration,
            price: this.price,
            courseId: this.courseId,
        };
    }

    update(props: Partial<ScheduleRequiredProps>) {
        if (props.title && props.title.trim().length < 3) {
            throw new Error('Schedule title must be at least 3 characters long');
        } else if (props.title && props.title.trim().length >= 3) {
            this.title = props.title.trim();
        }

        if (props.dateStart && Number.isNaN(Date.parse(props.dateStart))) {
            throw new Error('Invalid start date');
        } else if (props.dateStart) {
            this.dateStart = props.dateStart;
        }

        if (props.duration && (!Number.isInteger(props.duration) || props.duration <= 0)) {
            throw new Error('Duration must be a positive integer');
        } else if (props.duration) {
            this.duration = props.duration;
        }

        if (props.price !== undefined && props.price < 0) {
            throw new Error('Price must be zero or greater');
        } else if (props.price !== undefined) {
            this.price = props.price;
        }

        if (props.courseId && (!Number.isInteger(props.courseId) || props.courseId <= 0)) {
            throw new Error('Invalid course id');
        } else if (props.courseId) {
            this.courseId = props.courseId;
        }
    }
}