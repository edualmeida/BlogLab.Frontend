import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Article } from '../../store/data/schemas/article';
import { articleCatalogSelector } from '../../store/selectors/article-catalog.selectors';
import * as ArticleActions from "../../store/actions/article-catalog.actions";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppState } from '../../store/store';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent  implements OnInit {
  articles$: Signal<Article[] | undefined>;
  faCoffee = faCoffee;

  constructor(private store: Store<AppState>) {
    this.articles$ = toSignal(this.store.select(articleCatalogSelector));
  }

  loadArticles() {
    this.store.dispatch(ArticleActions.loadArticles());
  }

  ngOnInit(): void {
    this.loadArticles();
  }
}
