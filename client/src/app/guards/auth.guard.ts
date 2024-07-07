import { Location } from "@angular/common";
import { computed, inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";

export const adminGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  const isAuthenticated = computed(() => authService.isAuthenticated());
  if (!(isAuthenticated() && authService.getUserProfile().role === "ADMIN")) {
    return router.navigate(["/"]);
  }
  return true;
};

export const notLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const isAuthenticated = computed(() => authService.isAuthenticated());
  const location = inject(Location);
  if (isAuthenticated()) {
    location.back();
    window.location.reload();
    return false;
  }

  return true;
};
