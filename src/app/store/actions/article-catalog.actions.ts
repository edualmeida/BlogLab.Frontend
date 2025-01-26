import { createAction, props } from '@ngrx/store';
import { Article, ArticleCategory, CreateArticle } from '../../models/article';

export const loadArticles = createAction(
  '[Catalog] Load Articles',
  props<{ pageNumber:number, pageSize:number }>()
);
export const loadArticlesSuccess = createAction(
  '[Catalog] Load Articles Success',
  props<{ articles: Article[], totalPages: number }>()
);
export const loadArticlesFailure = createAction(
  '[Catalog] Load Articles Failure',
  props<{ error: string }>()
);
export const selectArticle = createAction(
  '[Catalog] Select Article',
  props<{ articleId: string }>()
);
export const createArticle = createAction(
  '[Catalog] Create',
  props<{ article: CreateArticle }>()
);
export const createArticleSuccess = createAction('[Catalog] Create Success');
export const createArticleFailure = createAction(
  '[Catalog] Create Failure',
  props<{ error: string }>()
);
export const loadCategories = createAction('[Catalog] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Catalog] Load Categories Success',
  props<{ categories: ArticleCategory[] }>()
);
export const loadCategoriesFailure = createAction(
  '[Catalog] Load Categories Failure',
  props<{ error: string }>()
);
