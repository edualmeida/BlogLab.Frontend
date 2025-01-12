import { createAction, props } from "@ngrx/store";
import { Article } from "../../models/article";

export const loadArticle = createAction('[Article] Load Article', props<{ id: string }>());
export const loadArticleSuccess = createAction('[Article] Load Article Success', props<{ article: Article }>());
export const loadArticleFailure = createAction('[Article] Load Article Failure', props<{ error: string }>());

