import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";
import { ArticleCatalogService } from "../../data/services/article-catalog.service";
import * as ArticleActions from "../actions/article.actions";

@Injectable()
export class ArticleEffects {
  
  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticles),
      mergeMap(() => 
        this.articleCatalogService.getAllArticles().pipe(
          map((articles) => ArticleActions.loadArticlesSuccess({ articles })),
          catchError((error) =>
            of(ArticleActions.loadArticlesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, 
    private articleCatalogService: ArticleCatalogService) {}
}