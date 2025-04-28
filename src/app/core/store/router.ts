import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const ROUTER_FEATURE_KEY = 'router';

export const selectRouter =
  createFeatureSelector<RouterReducerState>(ROUTER_FEATURE_KEY);

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getRouterSelectors(selectRouter);
