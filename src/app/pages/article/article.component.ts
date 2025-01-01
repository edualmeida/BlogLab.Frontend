import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-article',
  imports: [FooterComponent],
  templateUrl: './article.component.html',
  styleUrls: ['../styles/articles-feature.scss', './article.component.scss']
})
export class ArticleComponent {

}
