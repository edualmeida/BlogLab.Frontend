import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from '../article/article.component';
import { catalogFeature } from '../../store/article-catalog.reducers';

@Component({
  selector: 'app-view-article',
  imports: [CommonModule, FooterComponent, RouterModule, ArticleComponent],
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
