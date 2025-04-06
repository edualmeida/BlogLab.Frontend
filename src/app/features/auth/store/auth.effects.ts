import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../store/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  logIn$;
  logInSuccess$;
  logOut$;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
    this.logIn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logIn),
        mergeMap((payload: { email: string; password: string }) =>
          this.authService.logIn(payload.email, payload.password).pipe(
            map((loginResponse) => {
              return AuthActions.logInSuccess({ loginResponse });
            }),
            catchError((error) =>
              of(AuthActions.logInFailure({ validationErrors: error }))
            )
          )
        )
      )
    );

    this.logInSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logInSuccess),
          tap(() => {
            this.router.navigateByUrl('/');
          })
        ),
      { dispatch: false }
    );

    this.logOut$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logOut),
          tap(() => {
            this.authService.logout();
            this.router.navigateByUrl('/');
          })
        ),
      { dispatch: false }
    );
  }
}
