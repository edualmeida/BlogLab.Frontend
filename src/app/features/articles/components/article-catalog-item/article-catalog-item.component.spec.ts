import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCatalogItemComponent } from './article-catalog-item.component';

describe('ArticleCatalogItemComponent', () => {
  let component: ArticleCatalogItemComponent;
  let fixture: ComponentFixture<ArticleCatalogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCatalogItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCatalogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
