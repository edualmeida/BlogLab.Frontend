import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import * as AuthActions from '../actions/auth.actions';


export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  error: ''
};

export const reducer = createReducer(
    initialState,    
    on(AuthActions.logIn, (state) => ({ ...state })),
    on(AuthActions.logInSuccess, (state, { token }) => ({ ...state, token, isAuthenticated: true })),
    on(AuthActions.logInFailure, (state, { error }) => ({ ...state, error })),
    on(AuthActions.logOut, (state) => ({ ...state }))
);

export const authFeature = createFeature({
    name: 'auth',
    reducer
  });