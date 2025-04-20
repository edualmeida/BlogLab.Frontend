import { Routes } from '@angular/router';
import { ArticleCatalogComponent } from './features/articles/components/article-catalog/article-catalog.component';
import { ViewArticleComponent } from './features/articles/components/view-article/view-article.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { EditArticleComponent } from './features/articles/components/edit-article/edit-article.component';
import { adminAuthGuard } from './features/auth/guards/admin-auth.guard';
import { ArticleExistsGuard } from './features/articles/guards/article-exists.guard';
import { authRoutePaths } from './features/auth/auth.routes';

export const routePaths = {
  home: (relative = false) => `${relative ? '' : '/'}home`,
  viewArticle: (relative = false) => `${relative ? '' : '/'}article`,
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: routePaths.home(true) },
  {
    path: routePaths.home(true),
    component: ArticleCatalogComponent,
  },
  {
    path: routePaths.viewArticle(true),
    component: ViewArticleComponent,
    canActivate: [authGuard, ArticleExistsGuard],
  },
  {
    path: authRoutePaths.prefix,
    loadChildren: () =>
      import('./features/auth/auth.routes').then((mod) => mod.authRoutes),
  },
  {
    path: 'edit-article',
    component: EditArticleComponent,
    canActivate: [adminAuthGuard],
  },
];
