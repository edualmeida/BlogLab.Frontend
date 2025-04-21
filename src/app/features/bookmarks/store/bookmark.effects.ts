import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookmarkService } from '../services/bookmark.service';
import { bookmarkActions } from './bookmark.actions';

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
        ofType(bookmarkActions.bookmarkArticle),
        exhaustMap((payload: { articleId: string }) =>
          this.bookmarkService.bookmarkArticle(payload.articleId).pipe(
            map(() => {
              return bookmarkActions.bookmarkArticleSuccess();
            }),
            catchError((error) =>
              of(
                bookmarkActions.bookmarkArticleFailure({ error: error.message })
              )
            )
          )
        )
      )
    );
  }
}
