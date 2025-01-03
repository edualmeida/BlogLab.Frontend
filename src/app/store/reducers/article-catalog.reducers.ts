import { createReducer, on } from "@ngrx/store";
import { ArticleCatalogState } from "../states/article-catalog.state";
import { loadArticles, loadArticlesSuccess, loadArticlesFailure } from "../actions/article-catalog.actions";

export const initialState: ArticleCatalogState = {
    articles: [],
    loading: false,
    error: ''
};

export const catalogReducer = createReducer(
    initialState,    
    on(loadArticles, (state) => ({ ...state, loading: true })),    
    on(loadArticlesSuccess, (state, { articles }) => ({ ...state, articles: articles, loading: false })),    
    on(loadArticlesFailure, (state, { error }) => ({ ...state, error, loading: false }))
);