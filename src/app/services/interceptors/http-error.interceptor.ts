import {inject, NgZone} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpInterceptorFn } from '@angular/common/http';
import Utils from '../common-utils.service';
import {ErrorDialogService} from '../error-dialog.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const zone = inject(NgZone);
  const errorDialogService = inject(ErrorDialogService);

  return next(req).pipe(
    catchError((response: any) => {

      console.error('errorInterceptor->response', response);
      console.error('errorInterceptor->response.message', response.message);
      console.error('errorInterceptor->response.error.message', response.error.message);

      if (response instanceof HttpErrorResponse && response.status === 401) {
        authService.logout();
        router.navigateByUrl('/log-in');
      }
      else {
        zone.run(() =>
          errorDialogService.openDialog(
            response?.error?.message || 'Undefined client error'
          )
        );
      }

      return Utils.handleError(response);
    })
  );
};
