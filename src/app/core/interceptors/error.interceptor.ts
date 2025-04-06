import { inject, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';
import Utils from '../services/common-utils.service';
import { ErrorDialogService } from '../services/error-dialog.service';
import { routePaths } from '../../app.routes';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const zone = inject(NgZone);
  const errorDialogService = inject(ErrorDialogService);

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
        authService.logout();
        router.navigateByUrl(routePaths.login());
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
