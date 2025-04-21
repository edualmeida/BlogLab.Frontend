import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const bookmarkActions = createActionGroup({
  source: 'Bookmark',
  events: {
    bookmarkArticle: props<{ articleId: string }>(),
    bookmarkArticleSuccess: emptyProps(),
    bookmarkArticleFailure: props<{ error: string }>(),
  },
});
