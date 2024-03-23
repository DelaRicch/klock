import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { UserService } from '@services/user/user.service';

export const adminGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);

  if (
    !(
      authService.getAccessToken() &&
      userService.getUserProfile().role === 'ADMIN'
    )
  ) {
    return router.navigate(['/']);
  }
  return true;
};

export const notLoggedInGuard: CanActivateFn = () => {
  const location = inject(Location);
  const authService = inject(AuthService);

  if (authService.getAccessToken()) {
    location.back();
  }

  return true;
};
