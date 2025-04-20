import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import * as NotificationActions from './notification.actions';

@Injectable()
export class NotificationEffects {
  displaySuccess$;
  displayWarning$;
  displayError$;

  constructor(
    private actions$: Actions,
    private toastr: ToastrService
  ) {
    this.displaySuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(NotificationActions.displaySuccess),
          tap((action) => {
            this.toastr.success(action.description, action.title);
          })
        ),
      { dispatch: false }
    );

    this.displayWarning$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(NotificationActions.displayWarning),
          tap((action) => {
            this.toastr.warning(action.description, action.title);
          })
        ),
      { dispatch: false }
    );

    this.displayError$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(NotificationActions.displayError),
          tap((action) => {
            this.toastr.error(action.description, action.title, {
              timeOut: 0,
              extendedTimeOut: 0,
              closeButton: true,
            });
          })
        ),
      { dispatch: false }
    );
  }
}
