import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyAuthInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      'X-Api-Key': `${environment.apiKey}`,
    },
  });

  return next(req);
};
