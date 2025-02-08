import { inject } from '@angular/core';
import {HttpEvent, HttpInterceptorFn} from '@angular/common/http';
import {LoadingDialogService} from '../services/loading-dialog.service';
import {finalize, Observable} from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingDialogService = inject(LoadingDialogService);

  loadingDialogService.openDialog();
  return next(request).pipe(
    finalize(() => {
      loadingDialogService.hideDialog();
    })
  ) as Observable<HttpEvent<any>>;
};
