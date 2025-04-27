import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../common/footer/footer.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catalogFeature } from '../../store/article-catalog.reducers';
import { BookmarkToggleComponent } from '../../../bookmarks/components/bookmark-toggle/bookmark-toggle.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-view-article',
  imports: [
    CommonModule,
    FooterComponent,
    RouterModule,
    FontAwesomeModule,
    BookmarkToggleComponent,
  ],
  templateUrl: './view-article.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './view-article.component.scss',
  ],
})
export class ViewArticleComponent {
  store = inject(Store);
  article$ = this.store.select(catalogFeature.getSelectedArticle);
}
