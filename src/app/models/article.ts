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
}

export interface CreateArticle {
    title: string;
    subtitle: string;
    text: string;
    categoryId: string;
}

export interface ArticleCategory {
    id: string;
    name: string;
}