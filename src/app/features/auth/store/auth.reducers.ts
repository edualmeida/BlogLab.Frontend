import {
  Action,
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { persistState } from '../../../core/store/meta.reducers';
import { LoginResponse } from '../../../features/auth/models/user';
import { routerNavigationAction } from '@ngrx/router-store';

export interface AuthState {
  isAuthenticated: boolean;
  loginResponse: LoginResponse | null;
  validationErrors: string[] | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  loginResponse: null,
  validationErrors: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.logIn, (state) => ({ ...state })),
  on(AuthActions.logInSuccess, (state, { loginResponse }) => ({
    ...state,
    isAuthenticated: true,
    loginResponse,
  })),
  on(
    AuthActions.logInFailure,
    (state, { validationErrors: validationErrors }) => ({
      ...state,
      validationErrors,
      loginResponse: null,
      isAuthenticated: false,
    })
  ),
  on(AuthActions.logOut, (state) => ({
    ...state,
    loginResponse: null,
    isAuthenticated: false,
  })),
  on(routerNavigationAction, (state) => ({ ...state, validationErrors: null }))
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
