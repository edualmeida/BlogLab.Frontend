import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ArticleCatalogService } from '../services/article-catalog.service';
import { Router } from '@angular/router';
import { categoriesActions } from './categories.actions';

@Injectable()
export class CategoriesEffects {
  loadCategories$;

  constructor(
    private actions$: Actions,
    private articleCatalogService: ArticleCatalogService,
    private router: Router
  ) {
    this.loadCategories$ = createEffect(() =>
      this.actions$.pipe(
        ofType(categoriesActions.loadCategories),
        mergeMap(() =>
          this.articleCatalogService.getCategories().pipe(
            map((categories) =>
              categoriesActions.loadCategoriesSuccess({ categories })
            ),
            catchError((error) =>
              of(
                categoriesActions.loadCategoriesFailure({
                  error: error.message,
                })
              )
            )
          )
        )
      )
    );
  }
}
