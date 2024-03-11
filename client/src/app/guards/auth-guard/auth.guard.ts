import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.auth.success && authService.user.role === 'ADMIN') {
    return true;
  } else {
    return router.navigate(['']);
  }
};

export const notLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.auth.success) {
    return true;
  } else if (authService.auth.success && authService.user.role === 'ADMIN') {
    return router.navigate(['admin-dashboard']);
  } else {
    return router.navigate(['']);
  }
};
