import { Article } from '../models/article';

export interface ArticleState {
  article: Article | null;
  loading: boolean;
  error: string;
}

export const initialState: ArticleState = {
  article: null,
  loading: false,
  error: '',
};
