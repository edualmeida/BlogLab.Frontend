import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Store } from '@ngrx/store';
import { articleFeature } from '../../store/reducers/article.reducers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  imports: [CommonModule, FooterComponent],
  templateUrl: './article.component.html',
  styleUrls: ['../styles/index.scss', './article.component.scss']
})

export class ArticleComponent implements OnInit {
  store = inject(Store);
  article$ = this.store.select(articleFeature.selectArticle);
  
  ngOnInit(): void {
  }
}
