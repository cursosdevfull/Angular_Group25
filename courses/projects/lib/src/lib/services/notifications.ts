import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Error } from '../error/error';

const MessageError: Record<number, string> = {
  401: "Las credenciales no son válidas"
}


@Injectable({
  providedIn: 'root',
})
export class Notifications {
  notifier = inject(MatSnackBar)

  info(message: string, duration: number = 2000) {
    this.notifier.open(message, undefined, {
      duration,
    });
  }

  error(status: number, message: string = "", duration: number = 3000) {
    const fullMessage = message ? message : MessageError[status] || "An error occurred";

    this.notifier.open(fullMessage, undefined, {
      duration,
    });
  }
}
