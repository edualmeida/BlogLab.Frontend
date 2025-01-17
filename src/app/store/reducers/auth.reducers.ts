import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import * as AuthActions from '../actions/auth.actions';


export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  username: null,
  error: ''
};

export const reducer = createReducer(
    initialState,    
    on(AuthActions.logIn, (state) => ({ ...state })),
    on(AuthActions.logInSuccess, (state, { token, username }) => ({ ...state, token, username,  isAuthenticated: true })),
    on(AuthActions.logInFailure, (state, { error }) => ({ ...state, error, username: null, token: null, isAuthenticated: false })),
    on(AuthActions.logOut, (state) => ({ ...state, username: null, token: null, isAuthenticated: false }))
);

export const authFeature = createFeature({
    name: 'auth',
    reducer
  });