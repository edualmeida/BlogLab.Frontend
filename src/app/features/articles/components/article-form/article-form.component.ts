import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { categoriesFeature } from '../../store/categories.reducers';
import { Article, ArticleForm } from '../../models/article';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'blog-article-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './article-form.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './article-form.component.scss',
  ],
})
export class ArticleFormComponent {
  store = inject(Store);
  categories$ = this.store.select(categoriesFeature.selectCategories);
  articleSaved = output<ArticleForm>();
  isDeleteMode = input<boolean>(false);
  articleDeleted = output<string>();

  articleFormGroup = new FormGroup({
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

  submitArticle(): void {
    console.log('articleForm', this.articleFormGroup.value);
    this.articleSaved.emit(this.articleFormGroup.value as ArticleForm);
  }

  resetForm(): void {
    this.articleFormGroup.reset();
  }

  @Input() set article(article: Article | null | undefined) {
    this.articleFormGroup.patchValue({
      id: article?.id,
      title: article?.title,
      subtitle: article?.subtitle,
      text: article?.text,
      categoryId: article?.categoryId,
    });
  }

  deleteArticle(): void {
    this.articleDeleted.emit(this.articleFormGroup.value.id!);
  }
}
