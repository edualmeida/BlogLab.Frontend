import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ArticleCatalogService } from '../services/article-catalog.service';
import { articleCatalogActions } from '../store/article-catalog.actions';
import { Router } from '@angular/router';
import * as NotificationActions from '../../../core/store/notification.actions';
import { articlesRoutePaths } from '../articles.routes';

@Injectable()
export class ArticleCatalogEffects {
  loadArticles$;
  loadArticlesSuccess$;
  loadArticlesFailure$;
  loadTopArticles$;
  navigateToViewArticle$;

  constructor(
    private actions$: Actions,
    private articleCatalogService: ArticleCatalogService,
    private router: Router
  ) {
    this.loadArticles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadArticles),
        mergeMap(({ pageNumber, pageSize }) =>
          this.articleCatalogService.getAllArticles(pageNumber, pageSize).pipe(
            map((result) => {
              return articleCatalogActions.loadArticlesSuccess({
                articles: result.articles,
                totalPages: result.totalPages,
              });
            }),
            catchError((error) => {
              console.log(error);
              return of(
                articleCatalogActions.loadArticlesFailure({
                  error: error.message,
                })
              );
            })
          )
        )
      )
    );

    this.loadTopArticles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadTopArticles),
        mergeMap(({ pageSize }) =>
          this.articleCatalogService.getAllArticles(1, pageSize).pipe(
            map((result) =>
              articleCatalogActions.loadTopArticlesSuccess({
                articles: result.articles,
              })
            ),
            catchError((error) =>
              of(
                articleCatalogActions.loadTopArticlesFailure({
                  error: error.message,
                })
              )
            )
          )
        )
      )
    );

    this.navigateToViewArticle$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(articleCatalogActions.navigateToViewArticle),
          tap(({ articleId }) => {
            this.router.navigate([articlesRoutePaths.viewArticle()], {
              queryParams: { id: articleId },
            });
          })
        ),
      { dispatch: false }
    );

    this.loadArticlesSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadArticlesSuccess),
        mergeMap((action) =>
          of(
            NotificationActions.displaySuccess({
              title: `Loaded ${action.articles.length} articles`,
            })
          )
        )
      )
    );

    this.loadArticlesFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadArticlesFailure),
        mergeMap((action) =>
          of(
            NotificationActions.displayError({
              title: `Error loading articles: ${action.error}`,
            })
          )
        )
      )
    );
  }
}
