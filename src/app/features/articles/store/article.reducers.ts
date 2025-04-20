import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { articleActions } from '../store/article.actions';
import { initialState } from './article.state';

const reducer = createReducer(
  initialState,
  on(articleActions.loadArticle, (state) => ({ ...state, loading: true })),
  on(articleActions.loadArticleSuccess, (state, { article }) => ({
    ...state,
    article,
    loading: false,
  })),
  on(articleActions.loadArticleFailure, (state, { error }) => ({
    ...state,
    error,
    article: null,
    loading: false,
  })),
  on(articleActions.clearSelectedArticle, (state) => ({
    ...state,
    article: null,
    loading: false,
  }))
);

export const articleFeature = createFeature({
  name: 'article',
  reducer,
  extraSelectors: ({ selectArticle }) => ({
    selectNotNullArticle: createSelector(
      selectArticle,
      (article) => article !== null
    ),
  }),
});
