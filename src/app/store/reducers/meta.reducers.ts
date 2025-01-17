import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authFeature } from './auth.reducers';
import * as AuthActions from '../actions/auth.actions';
import { merge } from 'rxjs';
//import { reducers } from './reducers';

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

const mergeReducer = (state: any, rehydratedState: any, action: any) => {
  console.log('mergeReducer: ');
  console.log('state', state);
  console.log('action', action);
  if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION) && rehydratedState) {
    state = merge(state, rehydratedState); // <-- this line was changed to not clone
  }
  return state;
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  //return localStorageSync({keys: [authFeature.name]})(reducer);
  console.log('localStorageSyncReducer: ', reducer);
  return localStorageSync({
    keys: [authFeature.name],
    rehydrate: true,
    mergeReducer // <-- use in the config here
  })(reducer);
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export function persistStateReducer(_reducer: ActionReducer<any>) {
  const localStorageKey = '__identity';
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

export const metaReducers: MetaReducer<any>[] = [persistStateReducer];
