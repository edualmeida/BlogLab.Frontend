import { createAction, props } from "@ngrx/store";
import { Article } from "../../models/article";

export const loadArticle = createAction('[Article] Load Article', props<{ id: string }>());
export const loadArticleSuccess = createAction('[Article] Load Article Success', props<{ article: Article }>());
export const loadArticleFailure = createAction('[Article] Load Article Failure', props<{ error: string }>());
export const deleteArticle = createAction('[Article] Delete Article', props<{ id: string }>());
export const deleteArticleSuccess = createAction('[Article] Delete Article Success');
export const deleteArticleFailure = createAction('[Article] Delete Article Failure', props<{ error: string }>());


