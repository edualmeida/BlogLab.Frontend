import {Component, inject, OnInit} from '@angular/core';
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
import {Article, CreateArticle, UpdateArticle} from '../../models/article';
import {articleFeature} from '../../store/reducers/article.reducers';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

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
  readonly dialog = inject(MatDialog);
  articleId: string | null = null;
  article$: Observable<Article | null> | null = null;// = this.store.select(articleFeature.selectArticle);

  constructor() {
    this.article$ = this.store.select(articleFeature.selectArticle)
      .pipe(
        tap(article =>
          this.articleForm.patchValue({
            title: article?.title,
            subtitle: article?.subtitle,
            text: article?.text,
            categoryId: article?.categoryId
          })
        ),
        tap(article => this.articleId = article?.id ?? null)
      );
  }

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
    console.log('articleForm',this.articleForm.value);
    console.log('articleId',this.articleId);
    if(this.articleId){
      const updateArticle = this.articleForm.value as UpdateArticle;
      updateArticle.id = this.articleId;
      this.store.dispatch(CatalogActions.updateArticle({
        article: updateArticle,
      }));
    } else{
      this.store.dispatch(CatalogActions.createArticle({
        article: this.articleForm.value as CreateArticle,
      }));
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
        this.store.dispatch(ArticleActions.deleteArticle({ id }));
      }
    });
  }
}
