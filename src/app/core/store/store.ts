import { ArticleCatalogEffects } from '../../features/article-list/store/article-catalog.effects';
import { ArticleCatalogState } from '../../features/article-list/store/article-catalog.reducers';
import { AuthEffects } from '../../features/auth/store/auth.effects';
import { AuthState } from '../../features/auth/store/auth.reducers';
import { ArticleState } from '../../features/article-list/store/article.reducers';
import { ArticleEffects } from '../../features/article-list/store/article.effects';
import { NotificationEffects } from '../store/notification.effects';
import { BookmarkEffects } from '../../features/bookmarks/store/bookmark.effects';

export const articleCatalogFeatureKey = 'articleCatalog';

export interface AppState {
  articleCatalog: ArticleCatalogState;
  articleState: ArticleState;
  authState: AuthState;
}

export const appEffects = [
  ArticleCatalogEffects,
  AuthEffects,
  ArticleEffects,
  NotificationEffects,
  BookmarkEffects,
];
