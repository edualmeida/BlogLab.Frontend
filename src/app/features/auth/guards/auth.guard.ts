import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { authRoutePaths } from '../auth.routes';
import { authFeature } from '../store/auth.reducers';
import { of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(authFeature.selectIsUserOrAdminAuthenticated).pipe(
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate([authRoutePaths.login()]);
        return of(false);
      }

      return of(true);
    })
  );
};
