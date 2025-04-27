import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { editArticleActions } from '../../store/edit-article.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Article,
  ArticleForm,
  UpdateArticle,
} from '../../../../features/articles/models/article';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { catalogFeature } from '../../store/article-catalog.reducers';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { debug } from '../../../../core/extensions/rxjs-debug.operator';

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
    './edit-article.component.scss',
  ],
})
export class EditArticleComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  store = inject(Store);
  route = inject(ActivatedRoute);
  article$ = this.store.select(catalogFeature.getSelectedArticle);
  selectedArticle: Article | null = null;

  ngOnInit(): void {
    console.log('ngOnInit', this.route.snapshot.queryParams['id']);
    // this.article$
    //   .pipe(
    //     map((article) => article!),
    //     tap((article) => {
    //       console.log('2EditArticleComponent.article$', article);
    //       return (this.selectedArticle = article!);
    //     }),
    //     takeUntilDestroyed()
    //   )
    //   .subscribe();
  }

  articleSaved(articleForm: ArticleForm): void {
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
