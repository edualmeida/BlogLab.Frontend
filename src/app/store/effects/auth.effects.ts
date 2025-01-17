import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  logIn$;
  logInSuccess$;
  logOut$;

  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private router: Router) 
  {
    this.logIn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logIn),
        mergeMap((payload: {email: string, password: string}) => 
          this.authService.logIn(payload.email, payload.password).pipe(
            map((loginResponse) => AuthActions.logInSuccess({token: loginResponse.token, username: authService.getUsername(loginResponse.token)})),
              catchError((error) => of(AuthActions.logInFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.logInSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logInSuccess),
        tap((payload) => {
          console.log('LogInSuccess', payload);
          this.authService.setToken(payload.token);
          this.router.navigateByUrl('/');
        })
      ), { dispatch: false }
    );

    this.logOut$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logOut),
        tap(() => {
          this.authService.removeToken();
          this.router.navigateByUrl('/');
        })
      ), { dispatch: false }
    );
  }
}
