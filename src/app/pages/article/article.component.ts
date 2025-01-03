import { Component, Signal } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Article } from '../../store/data/schemas/article';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { articleSelector } from "../../store/selectors/article.selectors";
import { selectRouteArticleId } from '../../store/selectors/router.selectors';
import { AppState } from '../../store/store';

@Component({
  selector: 'app-article',
  imports: [FooterComponent],
  templateUrl: './article.component.html',
  styleUrls: ['../styles/articles-feature.scss', './article.component.scss']
})
export class ArticleComponent {
  isLoading$: Signal<boolean | undefined>;
  //article$: Signal<Article | undefined>;
  avatarImgURL: string | undefined;
  selectedId$ : Signal<string | undefined>;
  
  constructor(private store: Store<AppState>) {
    this.selectedId$ = toSignal(this.store.select(selectRouteArticleId));

    //this.article$ = toSignal(this.store.select(articleSelector));
    this.isLoading$ = toSignal(this.store.select((state) => state.articleCatalogState.loading));
    this.avatarImgURL = "/assets/avatar01.jpg";

  }
}
