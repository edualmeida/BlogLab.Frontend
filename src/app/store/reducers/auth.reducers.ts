import { Action, ActionReducer, createFeature, createReducer, MetaReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { debugActionState, persistState } from './meta.reducers';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  error: string | null;
  isAdmin: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  username: null,
  error: '',
  isAdmin: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.logIn, (state) => ({ ...state })),
  on(AuthActions.logInSuccess, (state, { token, username, isAdmin }) => ({
    ...state,
    token,
    username,
    isAuthenticated: true,
    isAdmin,
  })),
  on(AuthActions.logInFailure, (state, { error }) => ({
    ...state,
    error,
    username: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    username: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false,
  }))
);

export const authFeature = createFeature({
  name: 'auth',
  reducer,
});

export const IDENTITY_STORAGE_KEY = '__identity';
export function authMetaReducer(_reducer: ActionReducer<AuthState>): MetaReducer<AuthState, Action<string>> {
  return persistState(IDENTITY_STORAGE_KEY, _reducer) as MetaReducer<AuthState, Action<string>>;
}

export const metaReducers: MetaReducer<any>[] = [authMetaReducer];