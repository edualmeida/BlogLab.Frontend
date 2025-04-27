import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ArticleCatalogService } from '../../articles/services/article-catalog.service';
import { articleActions } from '../store/article.actions';
import { Router } from '@angular/router';
import { articlesRoutePaths } from '../articles.routes';

@Injectable()
export class ArticleEffects {
  readonly editArticleUrl = articlesRoutePaths.editArticle();
  readonly createArticleUrl = articlesRoutePaths.createArticle();

  loadArticle$;
  navigateToCreateArticle$;
  navigateToEditArticle$;
  loadSelectedArticle$;

  constructor(
    private actions$: Actions,
    private articleCatalogService: ArticleCatalogService,
    private router: Router
  ) {
    this.navigateToCreateArticle$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(articleActions.navigateToCreateArticle),
          tap(() => {
            this.router.navigate([this.createArticleUrl]);
          })
        ),
      { dispatch: false }
    );

    this.navigateToEditArticle$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(articleActions.navigateToEditArticle),
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
        ofType(articleActions.navigateToEditArticle),
        switchMap(({ id }) => {
          console.log('navigateToEditArticle->ArticleActions.loadArticle', id);
          return of(
            articleActions.loadArticle({
              id: id,
            })
          );
        })
      )
    );

    this.loadArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(articleActions.loadArticle),
        mergeMap((payload: { id: string }) =>
          this.articleCatalogService.getArticleById(payload.id).pipe(
            map((article) => {
              console.log('loadArticle$->getArticleById', article);
              return articleActions.loadArticleSuccess({ article });
            }),
            catchError((error) =>
              of(articleActions.loadArticleFailure({ error: error.message }))
            )
          )
        )
      )
    );
  }
}
