import { Component, inject, OnInit, Signal } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Article } from '../../models/article';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { articleSelector } from "../../store/selectors/article.selectors";
import { selectRouteArticleId, selectRouteParam } from '../../store/selectors/router.selectors';
import { AppState } from '../../store/store';
import { catalogFeature } from '../../store/reducers/article-catalog.reducers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  imports: [CommonModule, FooterComponent],
  templateUrl: './article.component.html',
  styleUrls: ['../styles/articles-feature.scss', './article.component.scss']
})
export class ArticleComponent implements OnInit {
  store = inject(Store);
  article$ = this.store.select(catalogFeature.selectSelectedArticle);
  
  // isLoading$: Signal<boolean | undefined>;
  // //article$: Signal<Article | undefined>;
  // avatarImgURL: string | undefined;
  // selectedId$ : Signal<string | undefined>;
  
  // constructor(private store: Store<AppState>) {
  //   this.selectedId$ = toSignal(this.store.select(selectRouteArticleId));


  //   //this.article$ = toSignal(this.store.select(articleSelector));
  //   this.isLoading$ = toSignal(this.store.select((state) => state.articleCatalog.loading));
  //   this.avatarImgURL = "/assets/avatar01.jpg";

  // }

  ngOnInit(): void {
    //console.log(selectRouteParam('id'));
  }
}
