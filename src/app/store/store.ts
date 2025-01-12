import { ArticleCatalogEffects as ArticleCatalogEffects } from "./effects/article-catalog.effects";
import { ArticleCatalogState } from "./reducers/article-catalog.reducers";
import { ArticleState } from "./states/article.state";
import * as auth from "./reducers/auth.reducers";
import { AuthEffects } from "./effects/auth.effects";

export const articleCatalogFeatureKey = "articleCatalog";

export interface AppState {
  articleCatalog: ArticleCatalogState
  articleState: ArticleState
  authState: auth.AuthState
}

export const appEffects = [ArticleCatalogEffects, AuthEffects];
