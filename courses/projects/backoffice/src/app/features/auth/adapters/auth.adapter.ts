
import { inject, Signal } from "@angular/core";
import { Auth } from "../domain";
import { TAuthPort } from "../domain/auth.port";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";

/* const users = [
    { email: "admin@backoffice.com", password: "Admin1234", accessToken: "atk_admin_9f3a21" },
    { email: "manager@backoffice.com", password: "Manager123", accessToken: "atk_manager_8b72cd" },
    { email: "sales@backoffice.com", password: "Sales1234", accessToken: "atk_sales_3d95ef" },
    { email: "support@backoffice.com", password: "Support123", accessToken: "atk_support_7a41bc" },
    { email: "finance@backoffice.com", password: "Finance123", accessToken: "atk_finance_5e28ad" },
    { email: "hr@backoffice.com", password: "Human1234", accessToken: "atk_hr_4c66fe" },
    { email: "ops@backoffice.com", password: "OpsTeam123", accessToken: "atk_ops_1b84da" },
    { email: "qa@backoffice.com", password: "Quality123", accessToken: "atk_qa_2e73bc" },
    { email: "dev@backoffice.com", password: "DevTeam123", accessToken: "atk_dev_6d52af" },
    { email: "guest@backoffice.com", password: "Guest1234", accessToken: "atk_guest_0a39ce" },
]
 */

export class AuthAdapter implements TAuthPort {
    http = inject(HttpClient)


    signIn(auth: Auth){
        return firstValueFrom(this.http.post<{accessToken: string} | {message: string}>("http://localhost:3000/auth/login", auth.properties))
       /*  .subscribe({
            next: (response) => {
                console.log("Login successful:", response);
            },
            error: (error) => {
                console.error("Login failed:", error);
            }
        });
 */

        /*         const { email, password } = auth.properties;
                const user = users.find((item) => item.email === email && item.password === password);
        
                await delay(4000); // Simula um atraso de 1 segundo para a resposta
        
                if (!user) {
                    throw new Error("Invalid credentials");
                }
        
                return user.accessToken; */
       // return "fake_access_token_1234567890";
    }
}