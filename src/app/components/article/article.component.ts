import { Component, inject, Input } from '@angular/core';
import { Article } from '../../models/article';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as BookmarkActions from '../../store/actions/bookmark.actions';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-article',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['../styles/index.scss', './article.component.scss'],
})
export class ArticleComponent {
  @Input() article!: Article;
  store = inject(Store);
  faSolidHeart = faSolidHeart;
  faRegularHeart = faRegularHeart;

  bookmarkArticle(): void {
    this.store.dispatch(
      BookmarkActions.bookmarkArticle({ articleId: this.article.id })
    );
  }
}
