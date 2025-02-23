import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ArticleCatalogService } from '../../services/article-catalog.service';
import * as CatalogActions from '../actions/article-catalog.actions';
import { Router } from '@angular/router';
import * as NotificationActions from '../actions/notification.actions';
import * as ArticleActions from '../actions/article.actions';

@Injectable()
export class ArticleCatalogEffects {
  readonly viewArticleUrl = "article";

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
  )
  {
    this.loadArticles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatalogActions.loadArticles),
        mergeMap(({pageNumber, pageSize}) =>
          this.articleCatalogService.getAllArticles(pageNumber, pageSize).pipe(
            map((result) => { console.log(result); return CatalogActions.loadArticlesSuccess({ articles: result.articles, totalPages: result.totalPages });}),
            catchError((error) =>
              of(CatalogActions.loadArticlesFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.loadTopArticles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatalogActions.loadTopArticles),
        mergeMap(({ pageSize }) =>
          this.articleCatalogService.getAllArticles(1, pageSize).pipe(
            map((result) => CatalogActions.loadTopArticlesSuccess({ articles: result.articles })),
            catchError((error) =>
              of(CatalogActions.loadTopArticlesFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.navigateToViewArticle$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(CatalogActions.navigateToViewArticle),
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
    //     ofType(CatalogActions.navigateToViewArticle),
    //     switchMap(({ articleId }) =>
    //       of(ArticleActions.loadArticle({
    //         id: articleId
    //       }))
    //     ),
    //   )
    // );

    this.loadCategories$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatalogActions.loadCategories),
        mergeMap(() =>
          this.articleCatalogService.getCategories().pipe(
            map((categories) =>
              CatalogActions.loadCategoriesSuccess({ categories })
            ),
            catchError((error) =>
              of(CatalogActions.loadCategoriesFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.createArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatalogActions.createArticle),
        mergeMap((params) =>
          this.articleCatalogService.createArticle(params.article).pipe(
            map(() => CatalogActions.createArticleSuccess()),
            catchError((error) => {
              console.log(error);
              return of(
                CatalogActions.createArticleFailure({ error: error.message })
              );
            })
          )
        )
      )
    );

    this.createArticleSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(CatalogActions.createArticleSuccess),
          tap(() => {
            this.router.navigate(['/'], {});
          })
        ),
      { dispatch: false }
    );

    this.loadArticlesSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatalogActions.loadArticlesSuccess),
        mergeMap((action) =>
          of(NotificationActions.displaySuccess({
            title: `Loaded ${action.articles.length} articles`
          }))
        ),
      )
    );

    this.createArticleSuccessNotification$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatalogActions.createArticleSuccess),
        switchMap((action) =>
          of(NotificationActions.displaySuccess({
            title: "Article created successfully!"
          }))
        ),
      )
    );
  }
}
