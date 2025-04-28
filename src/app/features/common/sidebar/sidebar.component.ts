import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { catalogFeature } from '../../../features/articles/store/article-catalog.reducers';
import { AsyncPipe } from '@angular/common';
import { articleCatalogActions } from '../../../features/articles/store/article-catalog.actions';
import { IntroComponent } from '../intro/intro.component';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, AsyncPipe, IntroComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  store = inject(Store);
  articles$ = this.store.select(catalogFeature.selectTopArticles);
  isLoading$ = this.store.select(catalogFeature.selectLoading);
  faCoffee = faCoffee;

  selectArticle(articleId: string) {
    this.store.dispatch(
      articleCatalogActions.navigateToViewArticle({ articleId })
    );
  }
}
