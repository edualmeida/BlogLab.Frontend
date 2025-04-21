import { environment } from '../../../../environments/environment';
import { Article } from '../models/article';

export interface CatalogPagination {
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface ArticleCatalogState {
  articles: Article[];
  topArticles: Article[];
  loading: boolean;
  selectedId: string | null;
  error: string;
  pagination: CatalogPagination;
}

export const initialState: ArticleCatalogState = {
  articles: [],
  topArticles: [],
  loading: false,
  selectedId: null,
  error: '',
  pagination: {
    totalPages: 0,
    pageNumber: 1,
    pageSize: environment.articleCatalogPageSize,
  },
};
