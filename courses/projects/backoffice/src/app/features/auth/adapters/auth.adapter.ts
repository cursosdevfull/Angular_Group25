
import { inject, Signal } from "@angular/core";
import { Auth } from "../domain";
import { TAuthPort } from "../domain/auth.port";
import { HttpClient } from "@angular/common/http";
import { env } from "../../../core/environments/environment";
import { IToken } from "../../../core/interfaces/token";


export class AuthAdapter implements TAuthPort {
    http = inject(HttpClient)

    signIn(auth: Auth) {
        return this.http.post<IToken | { message: string }>(`${env.API_URL}/api/auth/login`, auth.properties)
    }
}