import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { catalogFeature } from '../../../features/article-list/store/article-catalog.reducers';
import { AsyncPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { articleCatalogActions } from '../../../features/article-list/store/article-catalog.actions';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  store = inject(Store);
  articles$ = this.store.select(catalogFeature.selectTopArticles);
  isLoading$ = this.store.select(catalogFeature.selectLoading);
  faCoffee = faCoffee;

  ngOnInit(): void {
    this.store.dispatch(
      articleCatalogActions.loadTopArticles({
        pageSize: environment.sidebarArticlesCount,
      })
    );
  }

  selectArticle(articleId: string) {
    this.store.dispatch(
      articleCatalogActions.navigateToViewArticle({ articleId })
    );
  }
}
