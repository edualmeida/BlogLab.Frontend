import { ArticleCatalogEffects as ArticleCatalogEffects } from './effects/article-catalog.effects';
import { ArticleCatalogState } from './reducers/article-catalog.reducers';
import * as auth from './reducers/auth.reducers';
import { AuthEffects } from './effects/auth.effects';
import { ArticleState } from './reducers/article.reducers';
import { ArticleEffects } from './effects/article.effects';
import { NotificationEffects } from './effects/notification.effects';

export const articleCatalogFeatureKey = 'articleCatalog';

export interface AppState {
  articleCatalog: ArticleCatalogState;
  articleState: ArticleState;
  authState: auth.AuthState;
}

export const appEffects = [ArticleCatalogEffects, AuthEffects, ArticleEffects, NotificationEffects];
