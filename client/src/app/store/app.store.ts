import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import {  AuthStateType, UserStateType } from '../../types';
import { authReducer } from './auth/auth.reducers';
export interface AppState {
    user: UserStateType;
    auth: AuthStateType;
}

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return localStorageSync({ keys: ["user", "auth"], rehydrate: true })(reducer);
}

export const storeReducers: ActionReducerMap<AppState> = {
    user: userReducer,
    auth: authReducer
};

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];