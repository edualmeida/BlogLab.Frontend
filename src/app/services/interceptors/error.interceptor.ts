import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((response: any) => {
      console.log('errorInterceptor', response);
      console.log('errorInterceptor', response.error.message);
      if (response instanceof HttpErrorResponse && response.status === 401) {
        authService.logout();
        router.navigateByUrl('/log-in');
      }

      return throwError(() => new Error(response.error.message));
    })
  );
};