import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthStateType } from "@type/types";


export const selectAuthState = createFeatureSelector<AuthStateType>('auth');

export const selectAuth = createSelector(selectAuthState, (state) => state);
export const selectAuthError = createSelector(selectAuthState, (state) => state.message);
