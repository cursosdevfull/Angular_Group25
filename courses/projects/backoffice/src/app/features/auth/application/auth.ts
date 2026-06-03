import { effect, signal } from "@angular/core";
import { Auth, TAuthUseCasesPort, TAuthPort } from "../domain";
import { toSignal, toObservable } from "@angular/core/rxjs-interop";
import { IToken } from "../../../core/interfaces/token";
import { of, switchMap } from "rxjs";

export class AuthApplication implements TAuthUseCasesPort {
    auth = signal<Auth | null>(null);

    private _auth = toObservable<Auth | null>(this.auth).pipe(
        switchMap(credentials => {
            if (credentials) {
                return this.port.signIn(credentials);
            }
            return of(null)
        })
    )

    responseLoging = toSignal<IToken | { message: string } | null>(this._auth, { initialValue: null });

    constructor(private readonly port: TAuthPort) { }
}