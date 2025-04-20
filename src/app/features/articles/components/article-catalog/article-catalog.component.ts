import { Component, inject, OnInit } from '@angular/core';
import { articleCatalogActions } from '../../store/article-catalog.actions';
import { articleActions } from '../../store/article.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { catalogFeature } from '../../store/article-catalog.reducers';
import { environment } from '../../../../../environments/environment';
import { authFeature } from '../../../auth/store/auth.reducers';

@Component({
  selector: 'blog-article-catalog',
  templateUrl: './article-catalog.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './article-catalog.component.scss',
  ],
  imports: [CommonModule, SidebarComponent],
})
export class ArticleCatalogComponent implements OnInit {
  store = inject(Store);
  articles$ = this.store.select(catalogFeature.selectArticles);
  isLoading$ = this.store.select(catalogFeature.selectLoading);
  totalPages$ = this.store.select(catalogFeature.selectTotalPages);
  pageNumber = 1;
  avatarImgURL = '/assets/avatar01.jpg';
  isAdmin$ = this.store.select(authFeature.selectIsAdmin);

  ngOnInit(): void {
    this.loadArticles(this.pageNumber);
  }

  selectArticle(articleId: string) {
    this.store.dispatch(
      articleCatalogActions.navigateToViewArticle({ articleId })
    );
  }

  nextPage() {
    this.loadArticles(this.pageNumber++);
  }

  prevPage() {
    this.loadArticles(this.pageNumber--);
  }

  get isPrevDisabled() {
    return this.pageNumber === 1;
  }

  loadArticles(pageNumber = 1) {
    this.store.dispatch(
      articleCatalogActions.loadArticles({
        pageNumber: pageNumber,
        pageSize: environment.homeArticlesCount,
      })
    );
  }

  editArticle(articleId: string): void {
    this.store.dispatch(
      articleActions.navigateToEditArticle({ id: articleId })
    );
  }
}
