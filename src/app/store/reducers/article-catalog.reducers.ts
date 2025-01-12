import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import * as CatalogActions from "../actions/article-catalog.actions";
import { Article } from "../../models/article";

export interface ArticleCatalogState {
    articles: Article[];
    loading: boolean;
    selectedId: string | null;
    error: string;
}

export const initialState: ArticleCatalogState = {
    articles: [],
    loading: false,
    selectedId: null,
    error: ''
};

const reducer = createReducer(
    initialState,    
    on(CatalogActions.loadArticles, (state) => ({ ...state, loading: true })),    
    on(CatalogActions.loadArticlesSuccess, (state, { articles }) => ({ ...state, articles: articles, loading: false })),    
    on(CatalogActions.loadArticlesFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(CatalogActions.selectArticle, (state, { articleId }) => ({
        ...state,
        selectedId: articleId,
      }))
);

export const catalogFeature = createFeature({
    name: 'catalog',
    reducer,
    extraSelectors: ({ selectSelectedId, selectArticles }) => ({
        selectSelectedArticle: createSelector(
          selectSelectedId,
          selectArticles,
          (selectedId, articles) => articles.find((s) => s.id === selectedId)
        )
      })
  });