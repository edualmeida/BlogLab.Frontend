import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { authFeature, authMetaReducer } from './auth.reducers';
import * as AuthActions from '../actions/auth.actions';
import { merge } from 'rxjs';
//import { reducers } from './reducers';

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export function persistStateMetaReducer(localStorageKey: string, _reducer: ActionReducer<any>) {
  return (state: any | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }

    const nextState = _reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [authMetaReducer];
