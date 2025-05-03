import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookmarkService } from '../services/bookmark.service';
import { bookmarkActions } from './bookmark.actions';

@Injectable()
export class BookmarkEffects {
  bookmarkArticle;

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService
  ) {
    this.bookmarkArticle = createEffect(() =>
      this.actions$.pipe(
        ofType(bookmarkActions.bookmarkArticle),
        exhaustMap((action) => {
          const bookmarkAction = action.isBookmarked
            ? this.bookmarkService.deleteBookmark(action.articleId)
            : this.bookmarkService.bookmarkArticle(action.articleId);

          return bookmarkAction.pipe(
            map(() => {
              return bookmarkActions.bookmarkArticleSuccess();
            }),
            catchError((error) =>
              of(
                bookmarkActions.bookmarkArticleFailure({ error: error.message })
              )
            )
          );
        })
      )
    );
  }
}
