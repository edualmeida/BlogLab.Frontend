// Other selectors are available:

import { getRouterSelectors } from "@ngrx/router-store";
import { createSelector } from "reselect";

// https://next.ngrx.io/guide/router-store/selectors
export const {
    selectQueryParam,
    selectRouteParam,
    selectRouteDataParam, 
  } = getRouterSelectors();
  
export const selectRouteArticleId = selectRouteParam('id');

// export const selectUsersByDepartment = createSelector(
//    selectUsers,
//    selectSelectedDepatmentId,
//    (users, departmentId) => users.filter(u => u.departmentId === departmentId)
// );

// export const getRouteArticleId = createSelector(
//   (state: AppState) => state.router,
//   value => value,
// )


// const {
//   selectQueryParams, // select the current route query params
//   selectQueryParam, // factory function to select a query param
//   selectRouteParams, // select the current route params
//   selectRouteParam, // factory function to select a route param
//   selectRouteData, // select the current route data
//   selectUrl, // select the current url
// }: RouterStateSelectors<any> = fromRouter.getSelectors(selectRouter);