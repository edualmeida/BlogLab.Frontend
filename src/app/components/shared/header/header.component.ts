import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authFeature } from '../../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import * as AuthActions from '../../../store/actions/auth.actions';
import * as ArticleActions from '../../../store/actions/article.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, AsyncPipe],
})
export class HeaderComponent implements OnInit {
  store = inject(Store);
  authService = inject(AuthService);
  username$: any;
  isAdmin$: any;

  logout() {
    this.store.dispatch(AuthActions.logOut());
  }

  ngOnInit(): void {
    this.username$ = this.store.select(authFeature.selectUsername);
    this.isAdmin$ = this.store.select(authFeature.selectIsAdmin);
  }

  createArticle(): void {
    this.store.dispatch(ArticleActions.navigateToCreateArticle());
  }
}
