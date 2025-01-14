import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ServerArticle, Article, ArticleCategory, CreateArticle } from '../models/article';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ArticleCatalogService {
  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  getArticles(): Observable<any> {
    return this.http.get(environment.articleCatalogBaseUrl);
  }

  getAllArticles(): Observable<Article[]> {
    return this.getArticles()
      .pipe(
        map((serverArticles) => {
          return (
            serverArticles.map((article:ServerArticle): Article => ({
               id: article.id,
               thumbnail: `${environment.baseThumbnailUrl+article.thumbnail}`,
               title: article.title,
               subtitle: article.subtitle,
               text: article.text,
               category: article.category,
               color: article.color,
               createdOn: this.datepipe.transform(article.createdOn, 'longDate')!,
               author: article.author
           }))
        )})
      );
    }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<ServerArticle>(environment.articleCatalogBaseUrl + "/" + id)
      .pipe(
        map((article:ServerArticle) => {
          console.log('load srv getArticleById');
              return {
                id: article.id,
                thumbnail: `${environment.baseThumbnailUrl+article.thumbnail}`,
                title: article.title,
                subtitle: article.subtitle,
                text: article.text,
                category: article.category,
                color: article.color,
                createdOn: this.datepipe.transform(article.createdOn, 'longDate')!,
                author: article.author
            };
          })
      );
    }

  getCategories(): Observable<ArticleCategory[]> {
      return this.http.get<ArticleCategory[]>(environment.categoriesBaseUrl);
  }

  createArticle(article: CreateArticle): Observable<any> {
    return this.http.post(environment.articleCatalogBaseUrl, article).pipe(
      tap(_ => console.log(`Article added`))
    );
  }
}
