import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleCategory } from '../models/article';

export const categoriesActions = createActionGroup({
  source: 'Categories',
  events: {
    loadCategories: emptyProps(),
    loadCategoriesSuccess: props<{ categories: ArticleCategory[] }>(),
    loadCategoriesFailure: props<{ error: string }>(),
  },
});
