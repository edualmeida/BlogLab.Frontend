import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as BookmarkActions from './bookmark.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookmarkService } from '../services/bookmark.service';

@Injectable()
export class BookmarkEffects {
  bookmarkArticle;

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService,
    private router: Router
  ) {
    this.bookmarkArticle = createEffect(() =>
      this.actions$.pipe(
        ofType(BookmarkActions.bookmarkArticle),
        exhaustMap((payload: { articleId: string }) =>
          this.bookmarkService.bookmarkArticle(payload.articleId).pipe(
            map(() => {
              return BookmarkActions.bookmarkArticleSuccess();
            }),
            catchError((error) =>
              of(
                BookmarkActions.bookmarkArticleFailure({ error: error.message })
              )
            )
          )
        )
      )
    );
  }
}
