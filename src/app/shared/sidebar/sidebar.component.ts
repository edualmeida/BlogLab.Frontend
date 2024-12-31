import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Article } from '../../data/schemas/article';
import { AppState } from '../../store/store';
import { articleSelector } from '../../store/selectors/article.selectors';
import * as ArticleActions from "../../store/actions/article.actions";

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent  implements OnInit {
  articles$: Signal<Article[] | undefined>;

  constructor(private store: Store<AppState>) {
    this.articles$ = toSignal(this.store.select(articleSelector));
  }

  loadArticles() {
    this.store.dispatch(ArticleActions.loadArticles());
  }

  ngOnInit(): void {
    this.loadArticles();
  }
}
