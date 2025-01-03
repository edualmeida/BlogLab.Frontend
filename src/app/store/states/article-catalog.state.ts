import { Article } from "../data/schemas/article";

export interface ArticleCatalogState {
    articles: Article[];
    loading: boolean;
    error: string;
}