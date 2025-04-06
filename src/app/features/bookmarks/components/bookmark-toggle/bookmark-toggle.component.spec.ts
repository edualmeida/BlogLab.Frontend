import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkToggleComponent } from './bookmark-toggle.component';

describe('BookmarkToggleComponent', () => {
  let component: BookmarkToggleComponent;
  let fixture: ComponentFixture<BookmarkToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
