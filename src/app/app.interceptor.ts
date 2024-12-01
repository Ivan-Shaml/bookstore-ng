import {HttpInterceptorFn} from '@angular/common/http';
import {TOKEN_NAME} from '../common/constants';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_NAME);
  if (token) {
    const cloned = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    return next(cloned);
  } else {
    return next(req);
  }
};
