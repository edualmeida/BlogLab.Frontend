import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../models/article';

export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    navigateToCreateArticle: emptyProps(),
    navigateToEditArticle: props<{ id: string }>(),
    loadArticle: props<{ id: string }>(),
    loadArticleSuccess: props<{ article: Article }>(),
    loadArticleFailure: props<{ error: string }>(),
  },
});
