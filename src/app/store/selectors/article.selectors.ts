import { createSelector } from "reselect";
import { ArticleState } from "../states/article.state";
import { AppState } from "../store";

const articleState = (state: AppState) => state.articleState;

export const articleSelector = createSelector(
  articleState,
  (state: ArticleState) => state.article
);

export const getLoadingState = createSelector(
  articleState,
  state => {
    if (state === null) {
      return null;
    }
    return state.loading;
  }
);