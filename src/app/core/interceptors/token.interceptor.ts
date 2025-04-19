import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { authFeature } from '../../features/auth/store/auth.reducers';
import { first, mergeMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(authFeature.selectLoginResponse).pipe(
    first(),
    mergeMap((loginResponse) => {
      const token = loginResponse?.token;
      console.log('tokenInterceptor->token', token);
      const authReq = token
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        : req;

      return next(authReq);
    })
  );
};
