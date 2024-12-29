import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ServerArticle, Article } from '../schemas/article';
import Utils from './common-utils.service';
import { environment } from "../../environments/environment";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ArticleCatalogService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  getArticles(): Observable<any> {
    return this.http.get(environment.ArticleCatalogBaseUrl);
  }

  getAllArticles(): Observable<Article[]> {
    return this.getArticles()
      .pipe(
        map((serverArticles) => {
          console.log('load srv')

          return (
            serverArticles.map((article:ServerArticle): Article => ({
               id: article.id,
               thumbnail: `${environment.BaseThumbnailUrl+article.thumbnail}`,
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
}
