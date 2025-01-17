import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ArticleCatalogService } from "../../services/article-catalog.service";
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
            map((article) => {
              console.log(article);
              return ArticleActions.loadArticleSuccess({ article })
            }
            ),
            catchError((error) =>
              of(ArticleActions.loadArticleFailure({ error: error.message }))
            )
          )
        )
      )
    );
  }
}