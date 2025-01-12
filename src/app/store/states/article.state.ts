import { Article } from "../../models/article";

export interface ArticleState {
    article?: Article;
    loading: boolean;
    error: string;
}