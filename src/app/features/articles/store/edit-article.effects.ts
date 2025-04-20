import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ArticleCatalogService } from '../services/article-catalog.service';
import { Router } from '@angular/router';
import * as NotificationActions from '../../../core/store/notification.actions';
import { editArticleActions } from './edit-article.actions';

@Injectable()
export class EditArticleEffects {
  createArticle$;
  createArticleSuccess$;
  createArticleSuccessNotification$;
  createArticleFailureNotification$;
  deleteArticle$;
  deleteArticleSuccess$;

  constructor(
    private actions$: Actions,
    private articleCatalogService: ArticleCatalogService,
    private router: Router
  ) {
    this.createArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(editArticleActions.createArticle),
        mergeMap((params) =>
          this.articleCatalogService.createArticle(params.article).pipe(
            map(() => editArticleActions.createArticleSuccess()),
            catchError((error) => {
              console.log(error);
              return of(
                editArticleActions.createArticleFailure({
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
          ofType(editArticleActions.createArticleSuccess),
          tap(() => {
            this.router.navigate(['/'], {});
          })
        ),
      { dispatch: false }
    );

    this.createArticleSuccessNotification$ = createEffect(() =>
      this.actions$.pipe(
        ofType(editArticleActions.createArticleSuccess),
        switchMap(() =>
          of(
            NotificationActions.displaySuccess({
              title: 'Article created successfully!',
            })
          )
        )
      )
    );

    this.createArticleFailureNotification$ = createEffect(() =>
      this.actions$.pipe(
        ofType(editArticleActions.createArticleFailure),
        switchMap((action) =>
          of(
            NotificationActions.displayError({
              title: 'Error creating article: ' + action.error,
            })
          )
        )
      )
    );

    this.deleteArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(editArticleActions.deleteArticle),
        mergeMap((payload: { id: string }) =>
          this.articleCatalogService.deleteArticle(payload.id).pipe(
            map(() => editArticleActions.deleteArticleSuccess()),
            catchError((error) =>
              of(
                editArticleActions.deleteArticleFailure({
                  error: error.message,
                })
              )
            )
          )
        )
      )
    );

    this.deleteArticleSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(editArticleActions.deleteArticleSuccess),
          tap(() => {
            this.router.navigate(['']);
          })
        ),
      { dispatch: false }
    );
  }
}
