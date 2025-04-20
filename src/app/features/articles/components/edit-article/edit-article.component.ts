import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { editArticleActions } from '../../store/edit-article.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Article,
  CreateArticle,
  UpdateArticle,
} from '../../../../features/articles/models/article';
import { articleFeature } from '../../store/article.reducers';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { categoriesFeature } from '../../store/categories.reducers';

@Component({
  selector: 'app-edit-article',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-article.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './edit-article.component.scss',
  ],
})
export class EditArticleComponent implements OnInit {
  store = inject(Store);
  categories$ = this.store.select(categoriesFeature.selectCategories);
  route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  article$: Observable<Article | null> | null = null; // = this.store.select(articleFeature.selectArticle);

  articleForm = new FormGroup({
    id: new FormControl<string | null>(null),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    subtitle: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    text: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    categoryId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    this.article$ = this.store.select(articleFeature.selectArticle).pipe(
      tap((article) =>
        this.articleForm.patchValue({
          id: article?.id,
          title: article?.title,
          subtitle: article?.subtitle,
          text: article?.text,
          categoryId: article?.categoryId,
        })
      )
    );
  }

  ngOnInit() {
    //this.store.dispatch(categoriesActions.loadCategories());
  }

  onSubmit(): void {
    console.log('articleForm', this.articleForm.value);
    if (this.articleForm.value.id) {
      const updateArticle = this.articleForm.value as UpdateArticle;
      console.log('updateArticle', updateArticle);
      this.store.dispatch(
        editArticleActions.updateArticle({
          article: updateArticle,
        })
      );
    } else {
      this.store.dispatch(
        editArticleActions.createArticle({
          article: this.articleForm.value as CreateArticle,
        })
      );
    }
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
