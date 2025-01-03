import { Component, OnInit, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Article } from '../../store/data/schemas/article';
import * as CatalogActions from "../../store/actions/article-catalog.actions";
import { articleCatalogSelector } from "../../store/selectors/article-catalog.selectors";
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppState } from '../../store/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../styles/articles-feature.scss', './home.component.scss'],
  imports: [CommonModule, SidebarComponent, RouterLink]
})
export class HomeComponent implements OnInit {
  isLoading$: Signal<boolean | undefined>;
  articles$: Observable<Article[]>;
  avatarImgURL: string | undefined;

  constructor(private store: Store<AppState>) {
    this.articles$ = this.store.select((articleCatalogSelector));
    this.isLoading$ = toSignal(this.store.select((state) => state.articleCatalogState.loading));
    this.avatarImgURL = "/assets/avatar01.jpg";
  }

  ngOnInit(): void {
    this.store.dispatch(CatalogActions.loadArticles());
  }
}
