import { Component, inject } from '@angular/core';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { ArticleForm, CreateArticle } from '../../models/article';
import { Store } from '@ngrx/store';
import { editArticleActions } from '../../store/edit-article.actions';

@Component({
  selector: 'blog-create-article',
  imports: [ArticleFormComponent],
  templateUrl: './create-article.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    '../../../../shared/styles/host-container.scss',
    './create-article.component.scss',
  ],
})
export class CreateArticleComponent {
  store = inject(Store);

  articleSaved(articleForm: ArticleForm): void {
    this.store.dispatch(
      editArticleActions.createArticle({
        article: articleForm as CreateArticle,
      })
    );
  }
}
