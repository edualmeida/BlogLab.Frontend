import { Routes } from '@angular/router';
import { HomeComponent } from './features/article-list/components/article-catalog/article-catalog.component';
import { ViewArticleComponent } from './features/article-list/components/view-article/view-article.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { EditArticleComponent } from './features/article-list/components/edit-article/edit-article.component';
import { SignUpComponent } from './features/auth/components/sign-up/sign-up.component';
import { adminAuthGuard } from './features/auth/guards/admin-auth.guard';
import { ArticleExistsGuard } from './features/article-list/guards/article-exists.guard';

export const routePaths = {
  Home: (relative = false) => `${relative ? '' : '/'}home`,
  login: (relative = false) => `${relative ? '' : '/'}login`,
  viewArticle: (relative = false) => `${relative ? '' : '/'}article`,
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: routePaths.viewArticle(true),
    component: ViewArticleComponent,
    canActivate: [authGuard, ArticleExistsGuard],
  },
  {
    path: routePaths.login(true),
    loadChildren: () =>
      import('../app/features/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'edit-article',
    component: EditArticleComponent,
    canActivate: [adminAuthGuard],
  },
];
