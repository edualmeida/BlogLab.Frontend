import {Component, Input} from '@angular/core';
import {Article} from '../../models/article';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-article',
  imports: [RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['../styles/index.scss', './article.component.scss']
})
export class ArticleComponent {
  @Input() article!: Article;
}
