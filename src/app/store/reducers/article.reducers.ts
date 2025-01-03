import { createReducer, on } from "@ngrx/store";
import * as ArticleActions from "../actions/article.actions";
import { ArticleState } from "../states/article.state";

export const initialState: ArticleState = {
    article: undefined,
    loading: false,
    error: ''
};

export const articleReducer = createReducer(
    initialState,    
    on(ArticleActions.loadArticle, (state) => ({ ...state, loading: true })),    
    on(ArticleActions.loadArticleSuccess, (state, { article }) =>({ ...state, article, loading: false })),    
    on(ArticleActions.loadArticleFailure, (state, { error }) => ({ ...state, error, loading: false }))
);