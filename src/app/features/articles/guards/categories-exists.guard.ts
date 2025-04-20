import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, take } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ArticleCatalogService } from '../services/article-catalog.service';
import { ArticleCategory } from '../models/article';
import { HttpErrorResponse } from '@angular/common/http';
import Utils from '../../../core/services/common-utils.service';
import { categoriesFeature } from '../store/categories.reducers';
import { categoriesActions } from '../store/categories.actions';

@Injectable()
export class CategoriesExistsGuard implements CanActivate {
  constructor(
    private readonly store: Store<Store>,
    private readonly router: Router,
    private readonly articleCatalogService: ArticleCatalogService
  ) {}

  hasCategoriesInStore(): Observable<boolean> {
    return this.store.select(categoriesFeature.selectCategories).pipe(
      tap((categories) => console.log('Categories in store', categories)),
      map((categories) => !!categories && categories.length > 0),
      take(1)
    );
  }

  hasCategoriesInApi(): Observable<boolean> {
    return this.articleCatalogService.getCategories().pipe(
      tap((categories: ArticleCategory[]) =>
        console.log('Categories from API', categories)
      ),
      tap((categories) =>
        this.store.dispatch(
          categoriesActions.loadCategoriesSuccess({ categories })
        )
      ),
      map(
        (categories: ArticleCategory[]) => !!categories && categories.length > 0
      ),
      catchError((error) => {
        Utils.handleError(error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.router.navigate(['/404']);
        }

        return of(false);
      })
    );
  }

  hasCategories(): Observable<boolean> {
    return this.hasCategoriesInStore().pipe(
      switchMap((inStore) => {
        if (inStore) {
          console.log('Categories found in store');
          return of(inStore);
        }

        return this.hasCategoriesInApi();
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasCategories();
  }
}
