import { createSelector } from "@ngrx/store";
import { AppState } from "../app.store";

export const selectAuth = (state: AppState) => state.auth;
export const selectAuthState = createSelector(selectAuth, (state) => state);
