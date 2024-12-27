import { Action, ActionReducer } from "@ngrx/store";
import { articleReducer, ArticleState } from "./reducers/article.reducers";
import { ArticleEffects as ArticleEffects } from "./effects/article.effects";

export interface AppState {
  article: ArticleState
}

export interface AppStore {
  article: ActionReducer<ArticleState, Action>;
}

export const appStore: AppStore = {
  article: articleReducer
}

export const appEffects = [ArticleEffects];
