import { createAction, props } from "@ngrx/store";
import { Article } from "../data/schemas/article";

export const loadArticles = createAction('[Catalog] Load Articles');
export const loadArticlesSuccess = createAction('[Catalog] Load Articles Success', props<{ articles: Article[] }>());
export const loadArticlesFailure = createAction('[Catalog] Load Articles Failure', props<{ error: string }>());

