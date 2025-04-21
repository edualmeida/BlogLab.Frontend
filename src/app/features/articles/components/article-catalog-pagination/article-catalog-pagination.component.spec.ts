import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCatalogPaginationComponent } from './article-catalog-pagination.component';

describe('ArticleCatalogPaginationComponent', () => {
  let component: ArticleCatalogPaginationComponent;
  let fixture: ComponentFixture<ArticleCatalogPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCatalogPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleCatalogPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
