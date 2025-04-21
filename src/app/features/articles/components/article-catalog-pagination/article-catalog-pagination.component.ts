import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleCatalogActions } from '../../store/article-catalog.actions';
import { catalogFeature } from '../../store/article-catalog.reducers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-article-catalog-pagination',
  imports: [CommonModule],
  templateUrl: './article-catalog-pagination.component.html',
  styleUrl: './article-catalog-pagination.component.scss',
})
export class ArticleCatalogPaginationComponent {
  store = inject(Store);
  isPreviousPageAvailable$ = this.store.select(
    catalogFeature.selectIsPreviousPageAvailable
  );
  isNextPageAvailable$ = this.store.select(
    catalogFeature.selectIsNextPageAvailable
  );

  nextPage() {
    this.store.dispatch(articleCatalogActions.moveToNextPage());
  }

  prevPage() {
    this.store.dispatch(articleCatalogActions.moveToPreviousPage());
  }

  goToPage(pageNumber: number) {
    this.store.dispatch(articleCatalogActions.moveToPage({ pageNumber }));
  }
}
