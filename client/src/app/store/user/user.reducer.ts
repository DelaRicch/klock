import { createReducer, on } from '@ngrx/store';
import { UserStateType } from '../../../types/types';
import {
  UserProfileFailure,
  UserProfileLoading,
  UserProfileSuccess,
} from './user.actions';

export const UserState: UserStateType = {
  isLoading: false,
  success: false,
  user: null,
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
