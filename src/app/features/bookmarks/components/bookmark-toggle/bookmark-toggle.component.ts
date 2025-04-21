import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Article } from '../../../articles/models/article';
import { bookmarkActions } from '../../../bookmarks/store/bookmark.actions';

@Component({
  selector: 'blog-bookmark-toggle',
  imports: [FontAwesomeModule],
  templateUrl: './bookmark-toggle.component.html',
  styleUrl: './bookmark-toggle.component.scss',
})
export class BookmarkToggleComponent {
  @Input() article!: Article;
  store = inject(Store);
  faSolidHeart = faSolidHeart;
  faRegularHeart = faRegularHeart;

  bookmarkArticle(): void {
    this.store.dispatch(
      bookmarkActions.bookmarkArticle({ articleId: this.article.id })
    );
  }
}
