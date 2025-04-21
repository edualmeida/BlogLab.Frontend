import { createFeature, createReducer, on } from '@ngrx/store';
import { bookmarkActions } from './bookmark.actions';

export interface BookmarkState {
  loading: boolean;
  error: string;
}

export const initialState: BookmarkState = {
  loading: false,
  error: '',
};

const reducer = createReducer(
  initialState,
  on(bookmarkActions.bookmarkArticle, (state) => ({ ...state, loading: true })),
  on(bookmarkActions.bookmarkArticleSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(bookmarkActions.bookmarkArticleFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const bookmarkFeature = createFeature({
  name: 'bookmark',
  reducer,
});
