import { ArticleCatalogEffects as ArticleCatalogEffects } from "./effects/article-catalog.effects";
import { ArticleCatalogState } from "./reducers/article-catalog.reducers";
import { ArticleState } from "./states/article.state";

export const articleCatalogFeatureKey = "articleCatalog";

export interface AppState {
  articleCatalog: ArticleCatalogState
  articleState: ArticleState
}

export const appEffects = [ArticleCatalogEffects];
