import { Signal, WritableSignal } from "@angular/core";
import { Auth } from "./auth";
import { Observable } from "rxjs";
import { IToken } from "../../../core/interfaces/token";

export type TAuthUseCasesPort = {
    //login(auth: Auth): Observable<IToken | { message: string }>;
    auth: WritableSignal<Auth | null>;
    responseLoging: Signal<IToken | { message: string } | null>;
}