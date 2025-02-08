import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CatalogActions from '../../store/actions/article-catalog.actions';
import * as ArticleActions from '../../store/actions/article.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catalogFeature } from '../../store/reducers/article-catalog.reducers';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { CreateArticle } from '../../models/article';
import {articleFeature} from '../../store/reducers/article.reducers';
import {authFeature} from '../../store/reducers/auth.reducers';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-article',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-article.component.html',
  styleUrls: ['../styles/index.scss', './edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  store = inject(Store);
  categories$ = this.store.select(catalogFeature.selectCategories);
  route = inject(ActivatedRoute);
  article$ = this.store.select(articleFeature.selectArticle);
  isAdmin$ = this.store.select(authFeature.selectIsAdmin);
  readonly dialog = inject(MatDialog);

  articleForm = new FormGroup({
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

  ngOnInit() {
    this.store.dispatch(CatalogActions.loadCategories());
  }

  onSubmit(): void {
    console.log(this.articleForm.value);
    this.store.dispatch(
      CatalogActions.createArticle({
        article: this.articleForm.value as CreateArticle,
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
        this.store.dispatch(ArticleActions.deleteArticle({ id }));
      }
    });
  }
}
