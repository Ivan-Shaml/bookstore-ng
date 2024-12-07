import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const AlreadyAuthorizedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged) {
    router.navigate(['/home']);
    return true; // This is in order to prevent logged-in user to navigate register and homepage again
  }

  return true; // If the user is not authorized, still let him access the resource (login, register, ...)
};
