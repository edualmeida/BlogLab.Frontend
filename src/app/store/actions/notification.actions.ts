import { createAction, props } from "@ngrx/store";

export const displaySuccess = createAction(
  "[Notification] Display Success",
  props<{ title: string; description?: string }>()
);
export const displayWarning = createAction(
  "[Notification] Display Warning",
  props<{ title: string; description?: string }>()
);
export const displayError = createAction(
  "[Notification] Display Error",
  props<{ title: string; description?: string }>()
);
