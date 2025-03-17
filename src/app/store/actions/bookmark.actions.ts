import { createAction, props } from '@ngrx/store';

export const bookmarkArticle = createAction(
  '[Bookmark] Bookmark Article',
  props<{ articleId: string }>()
);

export const bookmarkArticleSuccess = createAction(
  '[Bookmark] Bookmark Article Success'
);

export const bookmarkArticleFailure = createAction(
  '[Bookmark] Bookmark Article Failure',
  props<{ error: string }>()
);
