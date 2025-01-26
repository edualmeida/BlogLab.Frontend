import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
  SetArticleId = '[Router] Set Article ID',
  Go = '[Router] Go',
  Back = '[Router] Back',
}

export const SetRouteArticleId = createAction(
  RouterActionTypes.SetArticleId,
  props<{ id: string }>()
);

export const Go = createAction(
  RouterActionTypes.Go,
  props<{
    payload: { path: any[]; query?: object; extras?: NavigationExtras };
  }>()
);

export const Back = createAction(RouterActionTypes.Back);
