import { Article } from "../data/schemas/article";

export interface ArticleState {
    article?: Article;
    loading: boolean;
    error: string;
}