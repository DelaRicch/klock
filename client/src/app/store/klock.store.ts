import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authReducer } from '@store/auth/auth.reducers';
import { userReducer } from '@store/user/user.reducer';
import { AppState } from '@type/types';

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({ keys: ['user', 'auth'], rehydrate: true })(reducer);
}

export const storeReducers: ActionReducerMap<AppState> = {
  user: userReducer,
  auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
