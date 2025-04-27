import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { articleCatalogActions } from './article-catalog.actions';
import { initialState } from './article-catalog.state';

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
      pagination: {
        ...state.pagination,
        totalPages: totalPages,
      },
    })
  ),
  on(articleCatalogActions.loadArticlesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    pagination: {
      ...state.pagination,
      totalPages: 0,
    },
  })),
  on(articleCatalogActions.navigateToViewArticle, (state, { articleId }) => ({
    ...state,
    selectedId: articleId,
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
  })),
  on(articleCatalogActions.moveToNextPage, (state) => ({
    ...state,
    pagination: {
      ...state.pagination,
      pageNumber: state.pagination.pageNumber + 1,
    },
  })),
  on(articleCatalogActions.moveToPreviousPage, (state) => ({
    ...state,
    pagination: {
      ...state.pagination,
      pageNumber: state.pagination.pageNumber - 1,
    },
  })),
  on(articleCatalogActions.moveToPage, (state, { pageNumber }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      pageNumber: pageNumber,
    },
  })),
  on(articleCatalogActions.loadArticleFromApi, (state, { article }) => ({
    ...state,
    articles: [...state.articles, article],
    selectedId: article.id,
  })),
  on(articleCatalogActions.bookmarkArticle, (state, { articleId }) => {
    const articles = state.articles.map((article) =>
      article.id === articleId
        ? { ...article, isBookmarked: !article.isBookmarked }
        : article
    );
    return {
      ...state,
      articles: articles,
    };
  }),
  on(articleCatalogActions.articleSelected, (state, { articleId }) => ({
    ...state,
    selectedId: articleId,
  })),
  on(articleCatalogActions.clearSelectedArticle, (state) => ({
    ...state,
    selectedId: null,
    error: '',
  }))
);

export const catalogFeature = createFeature({
  name: 'catalog',
  reducer,
  extraSelectors: ({ selectSelectedId, selectArticles, selectPagination }) => ({
    getSelectedArticle: createSelector(
      selectSelectedId,
      selectArticles,
      (selectedId, articles) => articles.find((s) => s.id === selectedId)
    ),
    selectIsPreviousPageAvailable: createSelector(
      selectPagination,
      (pagination) => pagination.pageNumber > 1
    ),
    selectIsNextPageAvailable: createSelector(
      selectPagination,
      (pagination) => pagination.pageNumber < pagination.totalPages
    ),
  }),
});
