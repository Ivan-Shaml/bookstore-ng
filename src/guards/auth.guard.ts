import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  if (userService.isLogged) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
