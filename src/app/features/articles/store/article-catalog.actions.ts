import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../models/article';

export const articleCatalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    loadArticles: emptyProps(),
    loadArticlesSuccess: props<{ articles: Article[]; totalPages: number }>(),
    loadArticlesFailure: props<{ error: string }>(),
    loadTopArticles: props<{ pageSize: number }>(),
    loadTopArticlesSuccess: props<{ articles: Article[] }>(),
    loadTopArticlesFailure: props<{ error: string }>(),
    navigateToViewArticle: props<{ articleId: string }>(),
    moveToNextPage: emptyProps(),
    moveToPreviousPage: emptyProps(),
    moveToPage: props<{ pageNumber: number }>(),
  },
});
