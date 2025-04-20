import { Component, inject, Input } from '@angular/core';
import { Article } from '../../models/article';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookmarkToggleComponent } from '../../../bookmarks/components/bookmark-toggle/bookmark-toggle.component';

@Component({
  selector: 'app-article',
  imports: [FontAwesomeModule, RouterModule, BookmarkToggleComponent],
  templateUrl: './article.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './article.component.scss',
  ],
})
export class ArticleComponent {
  @Input() article!: Article;
  store = inject(Store);
}
