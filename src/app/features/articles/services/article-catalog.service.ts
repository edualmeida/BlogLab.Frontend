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
  UpdateArticle,
} from '../models/article';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { debug } from '../../../core/extensions/rxjs-debug.operator';

@Injectable({
  providedIn: 'root',
})
export class ArticleCatalogService {
  constructor(
    private http: HttpClient,
    private datepipe: DatePipe
  ) {}

  getArticles(
    pageNumber: number,
    pageSize: number
  ): Observable<GetArticlesResponse> {
    const payloadUrl = `?pageNumber= + ${pageNumber} + &pageSize= + ${pageSize}`;

    return this.http.get<GetArticlesResponse>(
      environment.articleCatalogBaseUrl + payloadUrl
    );
  }

  getAllArticles(
    pageNumber: number,
    pageSize: number
  ): Observable<GetArticlesResult> {
    return this.getArticles(pageNumber, pageSize).pipe(
      map((response: GetArticlesResponse) => ({
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        articles: response.articles.map((serverArticle: ServerArticle) =>
          this.mapServerArticleToArticle(serverArticle, this.datepipe)
        ),
      }))
    );
  }

  getArticleById(id: string): Observable<Article> {
    return this.http
      .get<ServerArticle>(environment.articleCatalogBaseUrl + '/' + id)
      .pipe(
        map((serverArticle: ServerArticle) =>
          this.mapServerArticleToArticle(serverArticle, this.datepipe)
        )
      );
  }

  getCategories(): Observable<ArticleCategory[]> {
    return this.http.get<ArticleCategory[]>(environment.categoriesBaseUrl);
  }

  createArticle(article: CreateArticle): Observable<object> {
    return this.http
      .post(environment.articleCatalogBaseUrl, article)
      .pipe(debug(`Article added`));
  }

  updateArticle(article: UpdateArticle): Observable<object> {
    return this.http
      .put(environment.articleCatalogBaseUrl + '/' + article.id, article)
      .pipe(debug(`Article updated`));
  }

  deleteArticle(id: string): Observable<object> {
    return this.http
      .delete(environment.articleCatalogBaseUrl + '/' + id)
      .pipe(tap(() => console.log(`Article added`)));
  }

  private mapServerArticleToArticle(
    article: ServerArticle,
    datePipe: DatePipe
  ): Article {
    return {
      id: article.id,
      thumbnail: `${environment.baseThumbnailUrl + article.thumbnail}` + '.jpg',
      title: article.title,
      subtitle: article.subtitle,
      text: article.text,
      category: article.category,
      color: article.color,
      createdOn: datePipe.transform(article.createdOn, 'longDate')!,
      author: article.author,
      categoryId: article.categoryId,
      isBookmarked: article.isBookmarked,
    };
  }
}
