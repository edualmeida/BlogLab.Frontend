import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";
import { ArticleCatalogService } from "../data/services/article-catalog.service";
import * as CatalogActions from "../actions/article-catalog.actions";

@Injectable()
export class ArticleCatalogEffects {
  loadArticles$;
  // setArticleId$;

  constructor(private actions$: Actions, private articleCatalogService: ArticleCatalogService) 
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

    // this.setArticleId$ = createEffect(() => this.actions$.pipe(
    //   select(selectRouteParam('id')))
    //     .pipe(
    //       map((id: string) => ArticleActions.setArticleIdFromRoute({id})), // dispatch a new action to set the selected id
    //     ),
    //   {dispatch: true},
    // );
  }
}