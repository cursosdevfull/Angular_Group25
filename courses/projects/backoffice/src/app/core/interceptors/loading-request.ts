import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoaderService } from "lib";
import { finalize } from "rxjs/internal/operators/finalize";


export const loadingRequestInterceptor: HttpInterceptorFn = (req, next) => {
    const loaderService = inject(LoaderService);
    loaderService.show();

    return next(req).pipe(
        finalize(() => loaderService.hide())
    );
}