import { Route } from '@angular/router';
import { ArticleCatalogComponent } from './components/article-catalog/article-catalog.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { adminAuthGuard } from '../auth/guards/admin-auth.guard';
import { authGuard } from '../auth/guards/auth.guard';
import { ArticleExistsGuard } from './guards/article-exists.guard';

export const articlesRoutePaths = {
  prefix: 'articles',
  catalog: (relative = false) => `${relative ? '' : '/articles/'}catalog`,
  viewArticle: (relative = false) => `${relative ? '' : '/articles/'}article`,
  editArticle: (relative = false) =>
    `${relative ? '' : '/articles/'}edit-article`,
};

export const articlesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: articlesRoutePaths.catalog(true),
        component: ArticleCatalogComponent,
      },
      {
        path: articlesRoutePaths.viewArticle(true),
        component: ViewArticleComponent,
        canActivate: [authGuard, ArticleExistsGuard],
      },
      {
        path: articlesRoutePaths.editArticle(true),
        component: EditArticleComponent,
        canActivate: [adminAuthGuard],
      },
    ],
  },
];
