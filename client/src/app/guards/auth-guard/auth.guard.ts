import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  return true;
};

export const notLoggedInGuard: CanActivateFn = () => {
  const router: Router = inject(Router);

  return true;
};
