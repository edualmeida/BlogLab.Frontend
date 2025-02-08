import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token: string = authService.getToken();

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return next(req);
};
