import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { authFeature } from '../store/auth.reducers';
import { of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { authRoutePaths } from '../auth.routes';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(authFeature.selectIsAdmin).pipe(
    switchMap((isAdmin) => {
      if (!isAdmin) {
        router.navigate([authRoutePaths.login()]);
        return of(false);
      }

      return of(true);
    })
  );
};
