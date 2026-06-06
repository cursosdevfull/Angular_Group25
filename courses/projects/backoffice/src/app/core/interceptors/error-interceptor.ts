import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Notifications } from 'cursosdev_angular25';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(Notifications);

  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const backendMessage = error?.error?.message;
        const message = typeof backendMessage === 'string' && backendMessage.trim().length > 0
          ? backendMessage
          : error?.message;

        if (error.status >= 400) {
          notifier.error(error.status, message, 6000);
        }

        return of(new HttpResponse({
          status: error.status || 500,
          body: { message: message || 'An error occurred while processing the request.' },
        }));
      })
    );
};
