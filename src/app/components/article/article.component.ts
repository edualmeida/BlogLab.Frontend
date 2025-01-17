import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Store } from '@ngrx/store';
import { articleFeature } from '../../store/reducers/article.reducers';
import { CommonModule } from '@angular/common';
import * as ArticleActions from "../../store/actions/article.actions";
import { ActivatedRoute } from '@angular/router';
import { map, pluck, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [CommonModule, FooterComponent],
  templateUrl: './article.component.html',
  styleUrls: ['../styles/index.scss', './article.component.scss']
})

export class ArticleComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);
  article$ = this.store.select(articleFeature.selectArticle);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id')!;
      console.log(id);
      this.store.dispatch(ArticleActions.loadArticle({id}));
    });
  }
}
