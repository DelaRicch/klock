import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.canActivate()) {
    return true;
  } else {
    return router.navigate(['/']);
  }
};

export const signInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.canDecline() ? true : false;
};
