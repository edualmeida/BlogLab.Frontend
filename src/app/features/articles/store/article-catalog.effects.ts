import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ArticleCatalogService } from '../services/article-catalog.service';
import { articleCatalogActions } from '../store/article-catalog.actions';
import { Router } from '@angular/router';
import * as NotificationActions from '../../../core/store/notification.actions';
import { articlesRoutePaths } from '../articles.routes';
import { catalogFeature } from './article-catalog.reducers';
import { Store } from '@ngrx/store';
import { bookmarkActions } from '../../bookmarks/store/bookmark.actions';
import { articleActions } from './article.actions';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ArticleCatalogEffects {
  loadArticles$;
  loadArticlesSuccess$;
  loadArticlesFailure$;
  loadTopArticles$;
  setTopArticles$;
  loadTopArticlesFailure$;
  navigateToViewArticle$;
  // moveToNextPage$;
  // moveToPreviousPage$;
  articleBookmarked$;
  clearSelectedArticle$;
  changeRoutePagination$;

  constructor(
    private actions$: Actions,
    private articleCatalogService: ArticleCatalogService,
    private router: Router,
    private store: Store
  ) {
    this.loadArticles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadArticles),
        switchMap(({ pageNumber }) => {
          return this.articleCatalogService
            .getAllArticles(pageNumber, environment.articleCatalogPageSize)
            .pipe(
              map((result) => {
                return articleCatalogActions.loadArticlesSuccess({
                  articles: result.articles,
                  pagination: {
                    pageNumber: pageNumber,
                    pageSize: environment.articleCatalogPageSize,
                    totalPages: result.totalPages,
                  },
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
            );
        })
      )
    );

    this.setTopArticles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadArticlesSuccess),
        switchMap((action) => {
          if (action.pagination.pageNumber !== 1) {
            return of(articleCatalogActions.loadTopArticles());
          }

          return of(
            articleCatalogActions.loadTopArticlesSuccess({
              pageSize: environment.topArticlesPageSize,
              articles: action.articles,
            })
          );
        })
      )
    );

    this.loadTopArticles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadTopArticles),
        mergeMap(() =>
          this.articleCatalogService
            .getAllArticles(1, environment.topArticlesPageSize)
            .pipe(
              map((result) =>
                articleCatalogActions.loadTopArticlesSuccess({
                  pageSize: environment.topArticlesPageSize,
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

    this.loadTopArticlesFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleCatalogActions.loadTopArticlesFailure),
        mergeMap((action) =>
          of(
            NotificationActions.displayError({
              title: `Error loading top articles: ${action.error}`,
            })
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

    this.changeRoutePagination$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          articleCatalogActions.moveToNextPage,
          articleCatalogActions.moveToPreviousPage
        ),
        withLatestFrom(store.select(catalogFeature.selectPagination)),
        tap(([, pagination]) => {
          console.log('changeRoutePagination', pagination);
          this.router.navigate([], {
            queryParams: {
              pageNumber: pagination.pageNumber,
            },
            queryParamsHandling: 'merge',
            skipLocationChange: false,
          });
        }),
        switchMap(([, pagination]) => {
          return of(
            articleCatalogActions.loadArticles({
              pageNumber: pagination.pageNumber,
            })
          );
        })
      )
    );

    // this.moveToNextPage$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(articleCatalogActions.moveToNextPage),
    //     mergeMap(() => of(articleCatalogActions.loadArticles()))
    //   )
    // );

    // this.moveToPreviousPage$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(articleCatalogActions.moveToPreviousPage),
    //     mergeMap(() => of(articleCatalogActions.loadArticles()))
    //   )
    // );

    this.articleBookmarked$ = createEffect(() =>
      this.actions$.pipe(
        ofType(bookmarkActions.bookmarkArticle),
        switchMap(({ articleId }) =>
          of(articleCatalogActions.bookmarkArticle({ articleId }))
        )
      )
    );

    this.clearSelectedArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleActions.navigateToCreateArticle),
        switchMap(() => {
          return of(articleCatalogActions.clearSelectedArticle());
        })
      )
    );
  }
}
