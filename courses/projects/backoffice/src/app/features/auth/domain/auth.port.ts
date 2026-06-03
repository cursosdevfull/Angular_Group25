import { Observable } from "rxjs";
import { IToken } from "../../../core/interfaces/token";
import { Auth } from "./auth";

export type TAuthPort = {
    signIn: (auth: Auth) => Observable<IToken | { message: string }>;
}