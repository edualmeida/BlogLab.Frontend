import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from '../models/article';
import { CatalogPagination } from './article-catalog.state';

export const articleCatalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    loadArticles: props<{ pageNumber: number }>(),
    loadArticlesSuccess: props<{
      articles: Article[];
      pagination: CatalogPagination;
    }>(),
    loadArticlesFailure: props<{ error: string }>(),
    loadTopArticlesSuccess: props<{ pageSize: number; articles: Article[] }>(),
    navigateToViewArticle: props<{ articleId: string }>(),
    moveToNextPage: emptyProps(),
    moveToPreviousPage: emptyProps(),
    moveToPage: props<{ pageNumber: number }>(),
    loadArticleFromApi: props<{ article: Article }>(),
    bookmarkArticle: props<{ articleId: string }>(),
    articleSelected: props<{ articleId: string }>(),
    clearSelectedArticle: emptyProps(),
    routePaginationChanged: emptyProps(),
  },
});
