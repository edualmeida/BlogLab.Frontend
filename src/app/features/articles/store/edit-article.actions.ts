import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateArticle, UpdateArticle } from '../models/article';

export const editArticleActions = createActionGroup({
  source: 'EditArticle',
  events: {
    createArticle: props<{ article: CreateArticle }>(),
    createArticleSuccess: emptyProps(),
    createArticleFailure: props<{ error: string }>(),
    updateArticle: props<{ article: UpdateArticle }>(),
    updateArticleSuccess: emptyProps(),
    updateArticleFailure: props<{ error: string }>(),
    deleteArticle: props<{ id: string }>(), // This is the same as the deleteArticle action in article.actions.ts
    deleteArticleSuccess: emptyProps(),
    deleteArticleFailure: props<{ error: string }>(),
  },
});
