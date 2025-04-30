import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { editArticleActions } from '../../store/edit-article.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  ArticleForm,
  UpdateArticle,
} from '../../../../features/articles/models/article';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catalogFeature } from '../../store/article-catalog.reducers';
import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-edit-article',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ArticleFormComponent,
  ],
  templateUrl: './edit-article.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    '../../../../shared/styles/host-container.scss',
    './edit-article.component.scss',
  ],
})
export class EditArticleComponent {
  readonly dialog = inject(MatDialog);
  store = inject(Store);
  route = inject(ActivatedRoute);
  article$ = this.store.select(catalogFeature.getSelectedArticle);

  articleSaved(articleForm: ArticleForm): void {
    console.log('articleSaved', articleForm);
    this.store.dispatch(
      editArticleActions.updateArticle({
        article: articleForm as UpdateArticle,
      })
    );
  }

  deleteArticle(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Please confirm',
        question: 'Are you sure to delete this article?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.store.dispatch(editArticleActions.deleteArticle({ id }));
      }
    });
  }
}
