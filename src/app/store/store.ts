import { Action, ActionReducer } from "@ngrx/store";
import { catalogReducer } from "./reducers/article-catalog.reducers";
import { ArticleCatalogEffects as ArticleCatalogEffects } from "./effects/article-catalog.effects";
import { ArticleCatalogState } from "./states/article-catalog.state";
import { ArticleState } from "./states/article.state";
import { articleReducer } from "./reducers/article.reducers";

export interface AppState {
  articleCatalogState: ArticleCatalogState
  articleState: ArticleState
}

export interface AppStore {
  articleCatalogState: ActionReducer<ArticleCatalogState, Action>;
  articleState: ActionReducer<ArticleState, Action>;
}

export const appStore: AppStore = {
  articleCatalogState: catalogReducer,
  articleState: articleReducer
}

export const appEffects = [ArticleCatalogEffects];
