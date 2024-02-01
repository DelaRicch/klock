import { createReducer, on } from '@ngrx/store';
import { User, UserStateType } from '../../../types';

export const UserState: UserStateType = {
  isLoading: false,
  error: null,
  user: null,
};

export const userReducer = createReducer(UserState,

    );
