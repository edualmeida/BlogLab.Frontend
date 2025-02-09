import { createFeature, createReducer, on } from '@ngrx/store';
import * as ArticleActions from '../actions/article.actions';
import { Article } from '../../models/article';

export interface ArticleState {
  article: Article | null;
  loading: boolean;
  error: string;
}

export const initialState: ArticleState = {
  article: null,
  loading: false,
  error: '',
};

const reducer = createReducer(
  initialState,
  on(ArticleActions.loadArticle, (state) => ({ ...state, loading: true })),
  on(ArticleActions.loadArticleSuccess, (state, { article }) => ({
    ...state,
    article,
    loading: false,
  })),
  on(ArticleActions.loadArticleFailure, (state, { error }) => ({
    ...state,
    error,
    article: null,
    loading: false,
  })),
  on(ArticleActions.clearSelectedArticle, (state) => ({
    ...state,
    article: null,
    loading: false
  }))
);

export const articleFeature = createFeature({
  name: 'article',
  reducer,
});
