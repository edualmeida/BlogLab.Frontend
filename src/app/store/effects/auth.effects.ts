import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  logIn$;

  constructor(private actions$: Actions, private authService: AuthService) 
  {
    this.logIn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logIn),
        mergeMap((payload: {email: string, password: string}) => 
          this.authService.logIn(payload.email, payload.password).pipe(
            map((user) => AuthActions.logInSuccess({user})),
              catchError((error) => of(AuthActions.logInFailure({ error: error.message }))              
            )
          )
        )
      )
    );
  }
}
