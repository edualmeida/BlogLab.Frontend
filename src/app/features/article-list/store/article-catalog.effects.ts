import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ArticleCatalogService } from '../services/article-catalog.service';
import { articleCatalogActions } from '../store/article-catalog.actions';
import { Router } from '@angular/router';
import * as NotificationActions from '../../../core/store/notification.actions';

@Injectable()
export class ArticleCatalogEffects {
  readonly viewArticleUrl = 'article';

  loadArticles$;
  loadTopArticles$;
  navigateToViewArticle$;
  loadCategories$;
  createArticle$;
  createArticleSuccess$;
  loadArticlesSuccess$;
  createArticleSuccessNotification$;

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
              console.log(result);
              return articleCatalogActions.loadArticlesSuccess({
                articles: result.articles,
                totalPages: result.totalPages,
              });
            }),
            catchError((error) =>
              of(
                articleCatalogActions.loadArticlesFailure({
                  error: error.message,
                })
              )
            )
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
            this.router.navigate([this.viewArticleUrl], {
              queryParams: { id: articleId },
            });
          })
        ),
      { dispatch: false }
    );

    // loaded by the ArticleExistsGuard
    // this.loadSelectedArticle$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(articleCatalogActions.navigateToViewArticle),
    //     switchMap(({ articleId }) =>
    //       of(ArticleActions.loadArticle({
    //         id: articleId
    //       }))
    //     ),
    //   )
    // );

    this.loadCategories$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadCategories),
        mergeMap(() =>
          this.articleCatalogService.getCategories().pipe(
            map((categories) =>
              articleCatalogActions.loadCategoriesSuccess({ categories })
            ),
            catchError((error) =>
              of(
                articleCatalogActions.loadCategoriesFailure({
                  error: error.message,
                })
              )
            )
          )
        )
      )
    );

    this.createArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.createArticle),
        mergeMap((params) =>
          this.articleCatalogService.createArticle(params.article).pipe(
            map(() => articleCatalogActions.createArticleSuccess()),
            catchError((error) => {
              console.log(error);
              return of(
                articleCatalogActions.createArticleFailure({
                  error: error.message,
                })
              );
            })
          )
        )
      )
    );

    this.createArticleSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(articleCatalogActions.createArticleSuccess),
          tap(() => {
            this.router.navigate(['/'], {});
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

    this.createArticleSuccessNotification$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.createArticleSuccess),
        switchMap(() =>
          of(
            NotificationActions.displaySuccess({
              title: 'Article created successfully!',
            })
          )
        )
      )
    );
  }
}
