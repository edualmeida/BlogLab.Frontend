import { Article } from '../models/article';

export interface ArticleCatalogState {
  articles: Article[];
  topArticles: Article[];
  loading: boolean;
  selectedId: string | null;
  error: string;
  totalPages: number;
}

export const initialState: ArticleCatalogState = {
  articles: [],
  topArticles: [],
  loading: false,
  selectedId: null,
  error: '',
  totalPages: 0,
};
