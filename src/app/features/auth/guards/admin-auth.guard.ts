import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { routePaths } from '../../../app.routes';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isAdminAuthenticated()) {
    return true;
  }

  router.navigate([routePaths.login()]);
  return false;
};
