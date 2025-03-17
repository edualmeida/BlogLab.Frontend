import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import * as RouterActions from '../actions/router.actions';
import { getRouterSelectors } from '@ngrx/router-store';

export const { selectQueryParam, selectRouteParam, selectRouteDataParam } =
  getRouterSelectors();

export const selectRouteArticleId = selectRouteParam('id');

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.Go),
        map((action) => action.payload),
        tap(({ path, query: queryParams, extras }) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.Back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  setCurrentArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.SetRouteArticleId),
        tap(() => selectRouteParam('id'))
      ),
    { dispatch: false }
  );

  // setCurrentCourse$ = createEffect(() => this.actions$.pipe(
  //   select(selectRouteParam('id')))
  //     .pipe(
  //       map((id: string) => RouterActions.SetRouteArticleId({ id })), // dispatch a new action to set the selected id
  //     ),
  //   {dispatch: true},
  // );
}
