import {
  Action,
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { persistState } from './meta.reducers';
import { LoginResponse } from '../../models/user';

export interface AuthState {
  isAuthenticated: boolean;
  loginResponse: LoginResponse | null;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  loginResponse: null,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.logIn, (state) => ({ ...state })),
  on(AuthActions.logInSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
  })),
  on(AuthActions.logInFailure, (state, { error }) => ({
    ...state,
    error,
    loginResponse: null,
    isAuthenticated: false,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    loginResponse: null,
    isAuthenticated: false,
  }))
);

export const authFeature = createFeature({
  name: 'auth',
  reducer,
  extraSelectors: ({ selectAuthState }) => ({
    selectIsAdmin: createSelector(
      selectAuthState,
      (authState) => authState.loginResponse?.isAdmin
    ),
  }),
});

export const IDENTITY_STORAGE_KEY = '__identity';
export function authMetaReducer(
  _reducer: ActionReducer<AuthState>
): MetaReducer<AuthState, Action<string>> {
  return persistState(IDENTITY_STORAGE_KEY, _reducer) as MetaReducer<
    AuthState,
    Action<string>
  >;
}

export const metaReducers: MetaReducer<any>[] = [authMetaReducer];
