import { ArticleCatalogEffects } from '../../features/articles/store/article-catalog.effects';
import { AuthEffects } from '../../features/auth/store/auth.effects';
import { ArticleEffects } from '../../features/articles/store/article.effects';
import { NotificationEffects } from '../store/notification.effects';
import { BookmarkEffects } from '../../features/bookmarks/store/bookmark.effects';
import { EditArticleEffects } from '../../features/articles/store/edit-article.effects';
import { CategoriesEffects } from '../../features/articles/store/categories.effects';

export const articleCatalogFeatureKey = 'articleCatalog';

export const appEffects = [
  ArticleCatalogEffects,
  AuthEffects,
  ArticleEffects,
  EditArticleEffects,
  NotificationEffects,
  BookmarkEffects,
  CategoriesEffects,
];
