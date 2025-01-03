import { createReducer, on } from "@ngrx/store";
import * as RouterActions from "../actions/router.actions";
import { initialState } from "../states/article-catalog.state";

export const routerReducer = createReducer(
    initialState,
    
    on(RouterActions.SetRouteArticleId, (state, { id }) =>({ ...state, id }))
);