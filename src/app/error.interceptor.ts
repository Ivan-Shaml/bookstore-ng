import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError} from 'rxjs';
import {Router} from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      } else if (err.status === 404) {
        router.navigate(['/404']);
      }
      return [err];
    })
  );
};
