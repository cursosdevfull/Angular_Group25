import { Auth } from "./auth";

export type TAuthPort = {
    signIn: (auth: Auth) => Promise<any>;
}