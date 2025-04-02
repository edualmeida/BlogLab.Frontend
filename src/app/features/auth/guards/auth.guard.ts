import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardService: CanActivateFn = () => {
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
