export interface GetArticlesResponse {
  totalCount: number;
  totalPages: number;
  articles: ServerArticle[];
}

export interface GetArticlesResult {
  totalCount: number;
  totalPages: number;
  articles: Article[];
}

export interface ServerArticle {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  thumbnail: string;
  color: string;
  category: string;
  createdOn: Date;
  author: string;
  categoryId: string;
  isBookmarked: boolean | null;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  thumbnail: string;
  color: string;
  category: string;
  createdOn: string;
  author: string;
  categoryId: string;
  isBookmarked: boolean | null;
}

export interface CreateArticle {
  title: string;
  subtitle: string;
  text: string;
  categoryId: string;
}

export interface UpdateArticle {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  categoryId: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
}
