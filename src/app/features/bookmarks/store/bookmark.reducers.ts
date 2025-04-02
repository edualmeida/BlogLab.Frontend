import { createFeature, createReducer, on } from '@ngrx/store';
import { Bookmark } from '../models/bookmark';
import * as BookmarkActions from './bookmark.actions';

export interface BookmarkState {
  bookmark: Bookmark | null;
  loading: boolean;
  error: string;
}

export const initialState: BookmarkState = {
  bookmark: null,
  loading: false,
  error: '',
};

const reducer = createReducer(
  initialState,
  on(BookmarkActions.bookmarkArticle, (state) => ({ ...state, loading: true })),
  on(BookmarkActions.bookmarkArticleSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(BookmarkActions.bookmarkArticleFailure, (state, { error }) => ({
    ...state,
    error,
    article: null,
    loading: false,
  }))
);

export const bookmarkFeature = createFeature({
  name: 'bookmark',
  reducer,
});
