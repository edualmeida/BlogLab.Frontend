import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Article,
  ArticleCategory,
  CreateArticle,
  UpdateArticle,
} from '../models/article';

export const articleCatalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    loadArticles: props<{ pageNumber: number; pageSize: number }>(),
    loadArticlesSuccess: props<{ articles: Article[]; totalPages: number }>(),
    loadArticlesFailure: props<{ error: string }>(),
    loadTopArticles: props<{ pageSize: number }>(),
    loadTopArticlesSuccess: props<{ articles: Article[] }>(),
    loadTopArticlesFailure: props<{ error: string }>(),
    navigateToViewArticle: props<{ articleId: string }>(),
    createArticle: props<{ article: CreateArticle }>(),
    createArticleSuccess: emptyProps(),
    createArticleFailure: props<{ error: string }>(),
    updateArticle: props<{ article: UpdateArticle }>(),
    updateArticleSuccess: emptyProps(),
    updateArticleFailure: props<{ error: string }>(),
    loadCategories: emptyProps(),
    loadCategoriesSuccess: props<{ categories: ArticleCategory[] }>(),
    loadCategoriesFailure: props<{ error: string }>(),
  },
});
