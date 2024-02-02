import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, UserStateType } from "@type/types";

export const selectUserState = createFeatureSelector<UserStateType>('user') 

export const selectUser = createSelector(selectUserState, (state) => state.user)
export const selectUserLoading = createSelector(selectUserState, (state) => state.isLoading)
export const selectUserError = createSelector(selectUserState, (state) => state.message)
