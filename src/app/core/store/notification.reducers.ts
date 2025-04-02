import { createFeature, createReducer, on } from '@ngrx/store';
import {
  displaySuccess,
  displayError,
  displayWarning,
} from './notification.actions';

export const initialState = 0;

const reducer = createReducer(
  initialState,
  on(displaySuccess, (state) => state),
  on(displayError, (state) => state),
  on(displayWarning, (state) => state)
);

export const notificationFeature = createFeature({
  name: 'notification',
  reducer,
});
