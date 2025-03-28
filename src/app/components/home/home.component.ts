import { Component, inject, OnInit } from '@angular/core';
import { articleCatalogActions } from '../../store/actions/article-catalog.actions';
import * as ArticleActions from '../../store/actions/article.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { catalogFeature } from '../../store/reducers/article-catalog.reducers';
import { environment } from '../../../environments/environment';
import { authFeature } from '../../store/reducers/auth.reducers';
import { ArticleCatalogService } from '../../services/article-catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../styles/index.scss', './home.component.scss'],
  imports: [CommonModule, SidebarComponent],
})
export class HomeComponent implements OnInit {
  store = inject(Store);
  articles$ = this.store.select(catalogFeature.selectArticles);
  isLoading$ = this.store.select(catalogFeature.selectLoading);
  totalPages$ = this.store.select(catalogFeature.selectTotalPages);
  pageNumber = 1;
  avatarImgURL = '/assets/avatar01.jpg';
  isAdmin$ = this.store.select(authFeature.selectIsAdmin);
  private articleCatalogService = inject(ArticleCatalogService);
  ngOnInit(): void {
    this.loadArticles(this.pageNumber);
    this.articleCatalogService.getAllArticles(1, 3).subscribe((x) => {
      console.log(x);
    });
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
      ArticleActions.navigateToEditArticle({ id: articleId })
    );
  }
}
