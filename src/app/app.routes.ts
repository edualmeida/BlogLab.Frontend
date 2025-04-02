import { Routes } from '@angular/router';
import { HomeComponent } from './features/article-list/components/article-catalog/article-catalog.component';
import { ViewArticleComponent } from './features/article-list/components/view-article/view-article.component';
import { LogInComponent } from './features/auth/components/log-in/log-in.component';
import { authGuardService } from './features/auth/guards/auth.guard';
import { EditArticleComponent } from './features/article-list/components/edit-article/edit-article.component';
import { SignUpComponent } from './features/auth/components/sign-up/sign-up.component';
import { adminAuthGuard } from './features/auth/guards/admin-auth.guard';
import { ArticleExistsGuard } from './features/article-list/guards/article-exists.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'article',
    component: ViewArticleComponent,
    canActivate: [authGuardService, ArticleExistsGuard],
  },
  {
    path: 'login',
    component: LogInComponent,
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
