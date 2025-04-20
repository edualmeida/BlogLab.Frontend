import { createFeature, createReducer, on } from '@ngrx/store';
import { initialState } from './categories.state';
import { categoriesActions } from './categories.actions';

const reducer = createReducer(
  initialState,
  on(categoriesActions.loadCategories, (state) => ({
    ...state,
    loading: true,
  })),
  on(categoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
    loading: false,
  })),
  on(categoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const categoriesFeature = createFeature({
  name: 'categories',
  reducer,
});
