import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { articleFeature } from '../../store/reducers/article.reducers';
import { CommonModule } from '@angular/common';
import * as ArticleActions from '../../store/actions/article.actions';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { authFeature } from '../../store/reducers/auth.reducers';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-article',
  imports: [CommonModule, FooterComponent, RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['../styles/index.scss', './article.component.scss'],
})
export class ArticleComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);
  article$ = this.store.select(articleFeature.selectArticle);
  isAdmin$ = this.store.select(authFeature.selectIsAdmin);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id')!;
      console.log(id);
      this.store.dispatch(ArticleActions.loadArticle({ id }));
    });
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
