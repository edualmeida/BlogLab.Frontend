import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';

export const adminAuthGuardService: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isAdminAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
