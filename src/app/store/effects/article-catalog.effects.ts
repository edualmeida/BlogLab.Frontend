import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ArticleCatalogService } from "../../services/article-catalog.service";
import * as CatalogActions from "../actions/article-catalog.actions";
import { Router } from "@angular/router";

@Injectable()
export class ArticleCatalogEffects {
  loadArticles$;
  selectArticle$;
  loadCategories$;
  createArticle$;

  constructor(
    private actions$: Actions, 
    private articleCatalogService: ArticleCatalogService, 
    private router: Router) 
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

    this.selectArticle$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(CatalogActions.selectArticle),
            tap(({ articleId }) => {
              this.router.navigate(['article'], { queryParams: {id: articleId}});
            }),
          ),
        { dispatch: false },
      );

    this.loadCategories$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatalogActions.loadCategories),
        mergeMap(() => 
          this.articleCatalogService.getCategories().pipe(
            map((categories) => CatalogActions.loadCategoriesSuccess({ categories })),
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
            tap(() => {this.router.navigate(['/'], {});}),
            catchError((error) =>{
              console.log(error); 
              return of(CatalogActions.createArticleFailure({ error: error.message }));
            })
          )
        )
      )
    );
  }
}