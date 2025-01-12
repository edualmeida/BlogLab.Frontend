import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token: string = authService.getToken();

  req = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
      
  return next(req);
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((response: any) => {
      if (response instanceof HttpErrorResponse && response.status === 401) {
        localStorage.removeItem('token');
        router.navigateByUrl('/log-in');
      }

      return throwError(() => new Error(response.error.message));
    })
  );
};

