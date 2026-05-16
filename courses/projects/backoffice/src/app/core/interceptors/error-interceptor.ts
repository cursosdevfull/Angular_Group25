import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Notifications } from 'lib';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(Notifications)


  return next(req)
    .pipe(
      catchError(error => {
        if(error.status >= 400 && error.status < 500) {
          notifier.error(error.status, "", 60000);
          //console.error(`Client error: ${error.status} - ${error.statusText}`);
        } else if (error.status >= 500) {
          notifier.error(error.status, "", 60000);
          //console.error(`Server error: ${error.status} - ${error.statusText}`);
        } 

        return throwError(() => new Error('An error occurred while processing the request. Please try again later.'));
      })
    )
};
