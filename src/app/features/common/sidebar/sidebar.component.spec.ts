import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as ArticleActions from '../../../features/articles/store/article-catalog.actions';
import { catalogFeature } from '../../../features/articles/store/article-catalog.reducers';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Article } from '../../../features/articles/models/article';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let store: MockStore;
  const initialState = { catalog: { articles: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadArticles action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(ArticleActions.loadArticles());
  });

  it('should select articles from the store', () => {
    const articles = [
      { id: '1', title: 'Test Article', subtitle: 'Test' } as Article,
    ];
    store.setState({ catalog: { articles } });
    component.articles$.subscribe((result) => {
      expect(result).toEqual(articles);
    });
  });

  it('should display the FontAwesome icon', () => {
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('fa-icon')
    );
    expect(debugElement).toBeTruthy();
  });
});
