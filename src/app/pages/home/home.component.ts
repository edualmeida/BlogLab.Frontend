import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import * as CatalogActions from "../../store/actions/article-catalog.actions";
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';
import { catalogFeature } from '../../store/reducers/article-catalog.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../styles/articles-feature.scss', './home.component.scss'],
  imports: [CommonModule, SidebarComponent, RouterLink]
})
export class HomeComponent implements OnInit {
  store = inject(Store);
  articles$ = this.store.select(catalogFeature.selectArticles);
  isLoading$ = this.store.select(catalogFeature.selectLoading);
  avatarImgURL = "/assets/avatar01.jpg";

  ngOnInit(): void {
    this.store.dispatch(CatalogActions.loadArticles());
  }

  selectArticle(articleId: string) {
    this.store.dispatch(CatalogActions.selectArticle({articleId}));
  }
}
