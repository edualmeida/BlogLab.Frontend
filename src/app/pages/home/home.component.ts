import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Article } from '../../data/schemas/article';
import * as ArticleActions from "../../store/actions/article.actions";
import { articleSelector } from "../../store/selectors/article.selectors";
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, NgOptimizedImage]
})
export class HomeComponent implements OnInit {
  isLoading$: Signal<boolean | undefined>;
  articles$: Signal<Article[] | undefined>;
  avatarImgURL: string | undefined;

  constructor(private store: Store<AppState>) {
    this.articles$ = toSignal(this.store.select(articleSelector));
    this.isLoading$ = toSignal(this.store.select((state) => state.article.loading));
    this.avatarImgURL = "/assets/avatar01.jpg";
  }

  loadArticles() {
    this.store.dispatch(ArticleActions.loadArticles());
  }

  ngOnInit(): void {
    this.loadArticles();
  }
}
