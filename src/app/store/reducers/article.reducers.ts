import { createReducer, on } from "@ngrx/store";
import * as ArticleActions from "../actions/article.actions";
import { Article } from "../../data/schemas/article";

export interface ArticleState {
    articles: Article[];
    loading: boolean;
    error: string;
}

export const initialState: ArticleState = {
    articles: [],
    loading: false,
    error: ''
};

export const articleReducer = createReducer(
    initialState,
    
    on(ArticleActions.loadArticles, state => ({ ...state, loading: true })),
    
    on(ArticleActions.loadArticlesSuccess, (state, { articles }) =>({ ...state, articles, loading: false })),
    
    on(ArticleActions.loadArticlesFailure, (state, { error }) => ({ ...state, error, loading: false }))
);