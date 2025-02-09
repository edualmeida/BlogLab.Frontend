import { createAction, props } from '@ngrx/store';
import {Article, ArticleCategory, CreateArticle, UpdateArticle} from '../../models/article';

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
export const loadTopArticles = createAction(
  '[Catalog] Load Top Articles',
  props<{ pageSize:number }>()
);
export const loadTopArticlesSuccess = createAction(
  '[Catalog] Load Top Articles Success',
  props<{ articles: Article[] }>()
);
export const loadTopArticlesFailure = createAction(
  '[Catalog] Load Top Articles Failure',
  props<{ error: string }>()
);
export const navigateToViewArticle = createAction(
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
export const updateArticle = createAction(
  '[Catalog] Update',
  props<{ article: UpdateArticle }>()
);
export const updateArticleSuccess = createAction('[Catalog] Update Success');
export const updateArticleFailure = createAction(
  '[Catalog] Update Failure',
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
