import { createReducer, on } from '@ngrx/store';
import {
  UserProfileFailure,
  UserProfileLoading,
  UserProfileSuccess,
} from './user.actions';
import { UserInfoType, UserStateType } from '@type/types';

export const UserState: UserStateType = {
  isLoading: false,
  success: false,
  user: {} as UserInfoType,
  message: '',
};

export const userReducer = createReducer(
  UserState,
  on(UserProfileLoading, (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading,
      success: false,
    };
  }),

  on(UserProfileSuccess, (state, action) => {
    return {
      ...state,
      user: action.res.user,
      isLoading: false,
      success: action.res.success,
    };
  }),

  on(UserProfileFailure, (state, action) => {
    return {
      ...state,
      error: action.error.success,
      message: action.error.message,
    };
  })
);
