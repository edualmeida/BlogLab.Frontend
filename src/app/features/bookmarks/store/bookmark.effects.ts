import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookmarkService } from '../services/bookmark.service';
import { bookmarkActions } from './bookmark.actions';
import { catalogFeature } from '../../articles/store/article-catalog.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class BookmarkEffects {
  bookmarkArticle;

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService,
    private router: Router,
    private store: Store
  ) {
    this.bookmarkArticle = createEffect(() =>
      this.actions$.pipe(
        ofType(bookmarkActions.bookmarkArticle),
        withLatestFrom(store.select(catalogFeature.getSelectedArticle)),
        exhaustMap(([, article]) => {
          if (!article) {
            return of(
              bookmarkActions.bookmarkArticleFailure({
                error: 'No article found',
              })
            );
          }

          const bookmarkAction = article.isBookmarked
            ? this.bookmarkService.deleteBookmark(article!.id)
            : this.bookmarkService.bookmarkArticle(article!.id);

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
