import { Component, inject } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { articleFeature } from '../../store/reducers/article.reducers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ArticleComponent} from '../article/article.component';

@Component({
  selector: 'app-view-article',
  imports: [CommonModule, FooterComponent, RouterModule, ArticleComponent],
  templateUrl: './view-article.component.html',
  styleUrls: ['../styles/index.scss', './view-article.component.scss'],
})
export class ViewArticleComponent {
  store  = inject(Store);
  article$ = this.store.select(articleFeature.selectArticle);
}
