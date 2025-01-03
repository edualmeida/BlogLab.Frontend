import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ArticleCatalogService } from "../data/services/article-catalog.service";
import * as CatalogActions from "../actions/article-catalog.actions";
import { Router } from "@angular/router";

@Injectable()
export class ArticleCatalogEffects {
  loadArticles$;
  navigate$;

  constructor(private actions$: Actions, private articleCatalogService: ArticleCatalogService, private router: Router) 
  {
    this.loadArticles$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatalogActions.loadArticles),
        mergeMap(() => 
          this.articleCatalogService.getAllArticles().pipe(
            map((articles) => CatalogActions.loadArticlesSuccess({ articles })),
            catchError((error) =>
              of(CatalogActions.loadArticlesFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.navigate$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(CatalogActions.selectArticle),
            tap(({ articleId }) => {
              this.router.navigate(['article'], {});
            }),
          ),
        { dispatch: false },
      );
  }
}