import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ArticleActions from '../../../store/actions/article-catalog.actions';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { catalogFeature } from '../../../store/reducers/article-catalog.reducers';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent  implements OnInit {
  store = inject(Store);
  articles$ = this.store.select(catalogFeature.selectArticles);
  faCoffee = faCoffee;

  ngOnInit(): void {
    this.store.dispatch(ArticleActions.loadArticles());
  }
}
