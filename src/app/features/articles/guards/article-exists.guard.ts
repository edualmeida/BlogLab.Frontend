import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleFeature } from '../store/article.reducers';
import { Observable, of, take } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ArticleCatalogService } from '../services/article-catalog.service';
import { articleActions } from '../store/article.actions';
import { Article } from '../models/article';
import { HttpErrorResponse } from '@angular/common/http';
import Utils from '../../../core/services/common-utils.service';

@Injectable()
export class ArticleExistsGuard implements CanActivate {
  constructor(
    private readonly store: Store<Store>,
    private readonly router: Router,
    private readonly articleCatalogService: ArticleCatalogService
  ) {}

  /**
   * `hasArticle` composes `hasArticleInStore` and `hasArticleInApi`. It first checks
   * if the article is in store, and if not it then checks if it is in the
   * API.
   */
  hasArticleInStore(id: string): Observable<boolean> {
    return this.store.select(articleFeature.selectArticle).pipe(
      map((article) => !!article && article.id == id),
      take(1)
    );
  }

  /**
   * This method loads a article with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasArticleInApi(id: string): Observable<boolean> {
    return this.articleCatalogService.getArticleById(id).pipe(
      tap((article: Article) =>
        this.store.dispatch(articleActions.loadArticleSuccess({ article }))
      ),
      map((article: Article) => !!article),
      catchError((error) => {
        Utils.handleError(error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.router.navigate(['/404']);
        }

        return of(false);
      })
    );
  }

  /**
   * `hasArticle` composes `hasArticleInStore` and `hasArticleInApi`. It first checks
   * if the Article is in store, and if not it then checks if it is in the
   * API.
   */
  hasArticle(id: string): Observable<boolean> {
    return this.hasArticleInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasArticleInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasArticle(route.queryParams['id']);
  }
}
