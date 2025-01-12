import { createAction, props } from "@ngrx/store";
import { User } from '../../models/user';

export const logIn = createAction('[Auth] LogIn', props<{ email: string, password: string }>());
export const logInSuccess = createAction('[Auth] LogIn Success', props<{ user: User }>());
export const logInFailure = createAction('[Auth] LogIn Failure', props<{ error: string }>());
export const signUp = createAction('[Auth] SignUp', props<{ payload: any }>());
export const signUpSuccess = createAction('[Auth] SignUp Success', props<{ payload: any }>());
export const signUpFailure = createAction('[Auth] SignUp Failure', props<{ payload: any }>());
export const logOut = createAction('[Auth] LogOut');
export const getStatus = createAction('[Auth] GetStatus');