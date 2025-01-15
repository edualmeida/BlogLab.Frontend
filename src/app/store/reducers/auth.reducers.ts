import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { User } from '../../models/user';
import * as AuthActions from '../actions/auth.actions';


export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: ''
};

const reducer = createReducer(
    initialState,    
    on(AuthActions.logIn, (state) => ({ ...state })),    
    on(AuthActions.logInSuccess, (state, { user }) => ({ ...state, user, isAuthenticated: true })),    
    on(AuthActions.logInFailure, (state, { error }) => ({ ...state, error }))  
);

export const authFeature = createFeature({
    name: 'auth',
    reducer
  });