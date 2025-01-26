import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  ServerArticle,
  Article,
  ArticleCategory,
  CreateArticle,
  GetArticlesResponse,
  GetArticlesResult,
} from '../models/article';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleCatalogService {
  constructor(
    private http: HttpClient,
    private datepipe: DatePipe
  ) {}

  getArticles(pageNumber:number, pageSize:number): Observable<GetArticlesResponse> {
    return this.http.get<GetArticlesResponse>(
      environment.articleCatalogBaseUrl+
      '?pageNumber='+pageNumber+
      '&pageSize='+pageSize);
  }

  getAllArticles(pageNumber:number, pageSize:number): Observable<GetArticlesResult> {
    return this
      .getArticles(pageNumber, pageSize)
      .pipe(
        map((response:GetArticlesResponse) => ({
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          articles: response.articles.map(
            (article: ServerArticle): Article => ({
              id: article.id,
              thumbnail: `${environment.baseThumbnailUrl + article.thumbnail}`,
              title: article.title,
              subtitle: article.subtitle,
              text: article.text,
              category: article.category,
              color: article.color,
              createdOn: this.datepipe.transform(article.createdOn, 'longDate')!,
              author: article.author,
          }))
        }))
      );
  }

  getArticleById(id: string): Observable<Article> {
    return this.http
      .get<ServerArticle>(environment.articleCatalogBaseUrl + '/' + id)
      .pipe(
        map((article: ServerArticle) => {
          return {
            id: article.id,
            thumbnail: `${environment.baseThumbnailUrl + article.thumbnail}`,
            title: article.title,
            subtitle: article.subtitle,
            text: article.text,
            category: article.category,
            color: article.color,
            createdOn: this.datepipe.transform(article.createdOn, 'longDate')!,
            author: article.author,
          };
        })
      );
  }

  getCategories(): Observable<ArticleCategory[]> {
    return this.http.get<ArticleCategory[]>(environment.categoriesBaseUrl);
  }

  createArticle(article: CreateArticle): Observable<any> {
    return this.http
      .post(environment.articleCatalogBaseUrl, article)
      .pipe(tap(() => console.log(`Article added`)));
  }

  deleteArticle(id: string): Observable<any> {
    return this.http
      .delete(environment.articleCatalogBaseUrl + '/' + id)
      .pipe(tap(() => console.log(`Article added`)));
  }
}
