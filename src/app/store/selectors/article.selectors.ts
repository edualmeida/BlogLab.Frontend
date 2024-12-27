import { createSelector } from "reselect";
import { ArticleState } from "../reducers/article.reducers";
import { AppState } from "../store";

//export const getOAuth = (state: AppState) => state.oAuth;

const feature = (state: AppState) => state.article;

export const articleSelector = createSelector(
  feature,
  (state: ArticleState) => state.articles
);

export const getLoadingState = createSelector(
  feature,
  state => {
    if (state === null) {
      return null;
    }
    return state.loading;
  }
);
