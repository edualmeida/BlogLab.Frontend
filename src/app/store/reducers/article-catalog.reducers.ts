import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { articleCatalogActions } from '../actions/article-catalog.actions';
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
  on(articleCatalogActions.loadArticles, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    articleCatalogActions.loadArticlesSuccess,
    (state, { articles, totalPages }) => ({
      ...state,
      articles: articles,
      loading: false,
      totalPages: totalPages,
    })
  ),
  on(articleCatalogActions.loadArticlesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    totalPages: 0,
  })),
  on(articleCatalogActions.navigateToViewArticle, (state, { articleId }) => ({
    ...state,
    selectedId: articleId,
  })),
  on(articleCatalogActions.loadCategories, (state) => ({
    ...state,
    loading: true,
  })),
  on(articleCatalogActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
    loading: false,
  })),
  on(articleCatalogActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(articleCatalogActions.loadTopArticles, (state) => ({
    ...state,
    loading: true,
  })),
  on(articleCatalogActions.loadTopArticlesSuccess, (state, { articles }) => ({
    ...state,
    topArticles: articles,
    loading: false,
  })),
  on(articleCatalogActions.loadTopArticlesFailure, (state, { error }) => ({
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
