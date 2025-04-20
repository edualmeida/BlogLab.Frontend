import { Routes } from '@angular/router';
import { authRoutePaths } from './features/auth/auth.routes';
import { articlesRoutePaths } from './features/articles/articles.routes';

export const routePaths = {
  home: (relative = false) => `${relative ? '' : '/'}home`,
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: articlesRoutePaths.catalog(),
  },
  {
    path: authRoutePaths.prefix,
    loadChildren: () =>
      import('./features/auth/auth.routes').then((mod) => mod.authRoutes),
  },
  {
    path: articlesRoutePaths.prefix,
    loadChildren: () =>
      import('./features/articles/articles.routes').then(
        (mod) => mod.articlesRoutes
      ),
  },
];
