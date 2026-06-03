import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Storage } from '../services/storage';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(Storage)

  const token = storage.getItem('token');

  if (token) {
    const headers = req.headers.append('Authorization', `Bearer ${token}`);
    const requestCloned = req.clone({ headers });

    return next(requestCloned);
  }

  return next(req);
};
