import { TAuth } from "./auth.type";

export class Auth {
    private readonly email: string;
    private readonly password: string;

    constructor(props: TAuth) {
        if(!props.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error('Invalid email format');
        }

        if(!props.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            throw new Error('Password must be at least 8 characters long and contain both letters and numbers');
        }

        this.email = props.email;
        this.password = props.password;
    }

    get properties() {
        return {
            email: this.email,
            password: this.password,
        };
    }
}