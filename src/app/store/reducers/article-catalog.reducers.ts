import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as CatalogActions from '../actions/article-catalog.actions';
import { Article, ArticleCategory } from '../../models/article';

export interface ArticleCatalogState {
  articles: Article[];
  topArticles: Article[];
  loading: boolean;
  selectedId: string | null;
  error: string;
  categories: ArticleCategory[];
  totalPages: number;
}

export const initialState: ArticleCatalogState = {
  articles: [],
  topArticles: [],
  loading: false,
  selectedId: null,
  error: '',
  categories: [],
  totalPages: 0,
};

const reducer = createReducer(
  initialState,
  on(CatalogActions.loadArticles, (state) => ({ ...state, loading: true })),
  on(CatalogActions.loadArticlesSuccess, (state, { articles, totalPages }) => ({
    ...state,
    articles: articles,
    loading: false,
    totalPages: totalPages,
  })),
  on(CatalogActions.loadArticlesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    totalPages: 0,
  })),
  on(CatalogActions.selectArticle, (state, { articleId }) => ({
    ...state,
    selectedId: articleId,
  })),
  on(CatalogActions.loadCategories, (state) => ({ ...state, loading: true })),
  on(CatalogActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
    loading: false,
  })),
  on(CatalogActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CatalogActions.loadTopArticles, (state) => ({ ...state, loading: true })),
  on(CatalogActions.loadTopArticlesSuccess, (state, { articles }) => ({
    ...state,
    topArticles: articles,
    loading: false,
  })),
  on(CatalogActions.loadTopArticlesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const catalogFeature = createFeature({
  name: 'catalog',
  reducer,
  extraSelectors: ({ selectSelectedId, selectArticles }) => ({
    selectSelectedArticle: createSelector(
      selectSelectedId,
      selectArticles,
      (selectedId, articles) => articles.find((s) => s.id === selectedId)
    ),
  }),
});
