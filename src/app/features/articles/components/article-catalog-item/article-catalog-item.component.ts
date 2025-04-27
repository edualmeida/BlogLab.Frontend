import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from '../../models/article';
import { articleCatalogActions } from '../../store/article-catalog.actions';
import { articleActions } from '../../store/article.actions';
import { authFeature } from '../../../auth/store/auth.reducers';
import { CommonModule } from '@angular/common';
import { BookmarkToggleComponent } from '../../../bookmarks/components/bookmark-toggle/bookmark-toggle.component';

@Component({
  selector: 'blog-article-catalog-item',
  imports: [CommonModule, BookmarkToggleComponent],
  templateUrl: './article-catalog-item.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './article-catalog-item.component.scss',
  ],
})
export class ArticleCatalogItemComponent {
  store = inject(Store);
  @Input() article!: Article;
  isAdmin$ = this.store.select(authFeature.selectIsAdmin);

  selectArticle(articleId: string) {
    this.store.dispatch(
      articleCatalogActions.navigateToViewArticle({ articleId })
    );
  }

  editArticle(articleId: string): void {
    this.store.dispatch(
      articleActions.navigateToEditArticle({ id: articleId })
    );
  }
}
