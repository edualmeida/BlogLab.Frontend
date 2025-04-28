import { Component, inject, OnInit } from '@angular/core';
import { articleCatalogActions } from '../../store/article-catalog.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { catalogFeature } from '../../store/article-catalog.reducers';
import { ArticleCatalogItemComponent } from '../article-catalog-item/article-catalog-item.component';
import { ArticleCatalogPaginationComponent } from '../article-catalog-pagination/article-catalog-pagination.component';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { IntroComponent } from '../../../common/intro/intro.component';

@Component({
  selector: 'blog-article-catalog',
  templateUrl: './article-catalog.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './article-catalog.component.scss',
  ],
  imports: [
    CommonModule,
    SidebarComponent,
    ArticleCatalogItemComponent,
    ArticleCatalogPaginationComponent,
    SidebarComponent,
    IntroComponent,
  ],
})
export class ArticleCatalogComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  articles$ = this.store.select(catalogFeature.selectArticles);
  isLoading$ = this.store.select(catalogFeature.selectLoading);
  avatarImgURL = '/assets/avatar01.jpg'; // TODO: get from store

  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe((queryParams) => {
      const queryPageNumber = parseInt(queryParams['pageNumber']);
      this.store.dispatch(
        articleCatalogActions.loadArticles({
          pageNumber: isNaN(queryPageNumber) ? 1 : queryPageNumber,
        })
      );
    });
  }
}
