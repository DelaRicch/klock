import { UserState } from './user/user.reducer';
export interface AppState {
    user: typeof UserState;
}