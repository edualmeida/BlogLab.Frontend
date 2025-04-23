import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { debug } from '../../../core/extensions/rxjs-debug.operator';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  constructor(private http: HttpClient) {}

  bookmarkArticle(articleId: string): Observable<object> {
    console.log('Bookmarking article with id: ' + articleId);
    return this.http
      .post(environment.bookmarksBaseUrl, { articleId })
      .pipe(debug('Bookmarked article id: ' + articleId));
  }

  deleteBookmark(articleId: string): Observable<object> {
    console.log('Bookmarking article with id: ' + articleId);
    return this.http
      .delete(environment.bookmarksBaseUrl + '/' + articleId)
      .pipe(debug('deleteBookmark article id: ' + articleId));
  }
}
