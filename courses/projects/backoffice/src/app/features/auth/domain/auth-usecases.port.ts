import { Signal } from "@angular/core";
import { Auth } from "./auth";

export type TAuthUseCasesPort = {
    login(auth: Auth): Promise<any>;
}