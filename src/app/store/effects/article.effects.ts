import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ArticleCatalogService } from '../../services/article-catalog.service';
import * as ArticleActions from '../actions/article.actions';
import { Router } from '@angular/router';

@Injectable()
export class ArticleEffects {
  readonly editArticleUrl = 'edit-article';

  loadArticle$;
  deleteArticle$;
  deleteArticleSuccess$;
  navigateToCreateArticle$;
  navigateToEditArticle$;
  loadSelectedArticle$;
  clearSelectedArticle$;
  constructor(
    private actions$: Actions,
    private articleCatalogService: ArticleCatalogService,
    private router: Router
  ) {
    this.navigateToCreateArticle$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ArticleActions.navigateToCreateArticle),
          tap(() => {
            this.router.navigate([this.editArticleUrl]);
          })
        ),
      { dispatch: false }
    );

    this.clearSelectedArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ArticleActions.navigateToCreateArticle),
        switchMap(() => {
          return of(ArticleActions.clearSelectedArticle());
        })
      )
    );

    this.navigateToEditArticle$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ArticleActions.navigateToEditArticle),
          tap(({ id }) => {
            this.router.navigate([this.editArticleUrl], {
              queryParams: { id: id },
            });
          })
        ),
      { dispatch: false }
    );

    this.loadSelectedArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ArticleActions.navigateToEditArticle),
        switchMap(({ id }) => {
          console.log('navigateToEditArticle->ArticleActions.loadArticle', id);
          return of(
            ArticleActions.loadArticle({
              id: id,
            })
          );
        })
      )
    );

    this.loadArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ArticleActions.loadArticle),
        mergeMap((payload: { id: string }) =>
          this.articleCatalogService.getArticleById(payload.id).pipe(
            map((article) => {
              console.log('loadArticle$->getArticleById', article);
              return ArticleActions.loadArticleSuccess({ article });
            }),
            catchError((error) =>
              of(ArticleActions.loadArticleFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.deleteArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ArticleActions.deleteArticle),
        mergeMap((payload: { id: string }) =>
          this.articleCatalogService.deleteArticle(payload.id).pipe(
            map(() => ArticleActions.deleteArticleSuccess()),
            catchError((error) =>
              of(ArticleActions.deleteArticleFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.deleteArticleSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(ArticleActions.deleteArticleSuccess),
          tap(() => {
            this.router.navigate(['']);
          })
        ),
      { dispatch: false }
    );
  }
}
