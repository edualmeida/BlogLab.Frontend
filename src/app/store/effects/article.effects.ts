import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";
import { ArticleCatalogService } from "../data/services/article-catalog.service";
import * as ArticleActions from "../actions/article.actions";

@Injectable()
export class ArticleEffects {
  loadArticle$;

  constructor(private actions$: Actions, private articleCatalogService: ArticleCatalogService) 
  {
    this.loadArticle$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ArticleActions.loadArticle),
        mergeMap((payload: {id: string}) => 
          this.articleCatalogService.getArticleById(payload.id).pipe(
            map((article) => ArticleActions.loadArticleSuccess({ article })),
            catchError((error) =>
              of(ArticleActions.loadArticleFailure({ error: error.message }))
            )
          )
        )
      )
    );
  }
}