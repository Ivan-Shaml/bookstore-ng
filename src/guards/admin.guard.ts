import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  if (userService.isAdmin) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
