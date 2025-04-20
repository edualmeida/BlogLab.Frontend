import { ArticleCategory } from '../models/article';

export interface CategoriesState {
  categories: ArticleCategory[];
}

export const initialState: CategoriesState = {
  categories: [],
};
