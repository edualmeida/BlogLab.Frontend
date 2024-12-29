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