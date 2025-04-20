import { inject, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';
import Utils from '../services/common-utils.service';
import { ErrorDialogService } from '../services/error-dialog.service';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../features/auth/store/auth.actions';
import { authRoutePaths } from '../../features/auth/auth.routes';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const zone = inject(NgZone);
  const errorDialogService = inject(ErrorDialogService);
  const store = inject(Store);

  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      console.error('errorInterceptor->response', response);

      if (response.error) {
        console.error(
          'errorInterceptor->custom response.error',
          response.error
        );

        return throwError(() => response.error);
      }

      if (response.status === 401 && !response.error) {
        store.dispatch(AuthActions.logOut());
        router.navigateByUrl(authRoutePaths.login());
      } else {
        zone.run(() =>
          errorDialogService.openDialog(
            response.error || 'Undefined client error'
          )
        );
      }

      return Utils.handleError(response);
    })
  );
};
