import { createReducer, on } from '@ngrx/store';
import { AuthStateType } from '../../../types/types';
import {
  LoginUserFailure,
  LoginUserSuccess,
  LogoutUser,
  RegisterUser,
} from './auth.actions';

export const AuthState: AuthStateType = {
  success: false,
  message: '',
  accessToken: {
    value: '',
    expiration: 0,
  },
  refreshToken: {
    value: '',
    expiration: 0,
  },
};

export const authReducer = createReducer(
  AuthState,
  on(LoginUserSuccess, (state, action) => {
    return {
      ...state,
      success: action.res.success,
      message: action.res.message,
      accessToken: action.res.accessToken,
      refreshToken: action.res.refreshToken,
    };
  }),

  on(LoginUserFailure, (state, action) => {
    return {
      ...state,
      success: action.error.success,
      message: action.error.message,
    };
  }),

  on(RegisterUser, (state, action) => {
    return {
      ...state,
      success: action.res.success,
      message: action.res.message,
      accessToken: action.res.accessToken,
      refreshToken: action.res.refreshToken,
    };
  }),

  on(LogoutUser, (state) => {
    return {
      ...state,
      success: false,
      message: '',
      accessToken: {
        value: '',
        expiration: 0,
      },
      refreshToken: {
        value: '',
        expiration: 0,
      },
    };
  })
);
