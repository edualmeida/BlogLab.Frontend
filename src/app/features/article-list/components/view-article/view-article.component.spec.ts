import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticleComponent } from './view-article.component';

describe('ArticleComponent', () => {
  let component: ViewArticleComponent;
  let fixture: ComponentFixture<ViewArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewArticleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
