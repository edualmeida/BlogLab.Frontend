import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authFeature } from '../../../features/auth/store/auth.reducers';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import * as AuthActions from '../../../features/auth/store/auth.actions';
import * as ArticleActions from '../../../features/article-list/store/article.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, AsyncPipe],
})
export class HeaderComponent {
  store = inject(Store);
  loginResponse$ = this.store.select(authFeature.selectLoginResponse);

  logout() {
    this.store.dispatch(AuthActions.logOut());
  }

  createArticle(): void {
    this.store.dispatch(ArticleActions.navigateToCreateArticle());
  }
}
