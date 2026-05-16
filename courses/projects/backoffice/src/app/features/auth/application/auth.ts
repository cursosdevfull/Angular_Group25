import { Auth, TAuthUseCasesPort, TAuthPort } from "../domain";

export class AuthApplication implements TAuthUseCasesPort {
    constructor(private readonly port: TAuthPort){}

    login(auth: Auth) {
        return this.port.signIn(auth);
    }
}