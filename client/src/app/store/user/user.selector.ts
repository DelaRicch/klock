import { createSelector } from "@ngrx/store";
import { AppState } from "../app.store";

export const selectUserState = (state: AppState) => state.user;
export const selectUser = createSelector(selectUserState, (state) => state.user);
export const selectUserLoading = createSelector(selectUserState, (state) => state.isLoading);
export const selectUserError = createSelector(selectUserState, (state) => state.error);