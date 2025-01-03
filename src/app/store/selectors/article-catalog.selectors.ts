import { createSelector } from "reselect";
import { ArticleCatalogState } from "../states/article-catalog.state";
import { AppState } from "../store";

const getArticleCatalogState = (state: AppState) => state.articleCatalogState;

export const articleCatalogSelector = createSelector(
  getArticleCatalogState,
  (state: ArticleCatalogState) => state.articles
);

export const getLoadingSelector = createSelector(
  getArticleCatalogState,
  state => {
    if (state === null) {
      return null;
    }
    return state.loading;
  }
);