import { createReducer, on } from '@ngrx/store';
import { User, UserStateType } from '../../../types';
import * as UserActions from './user.actions';

export const UserState: UserStateType = {
  isLoading: false,
  error: null,
  user: null,
  response: null,
};

export const userReducer = createReducer(UserState,
    on(UserActions.LoginUser, (state) => ({ ...state, isLoading: true, error: null, response: null})),
    on(UserActions.LoginUserSuccess, (state, { response }) => ({ ...state, isLoading: false, response, error: null})),
    on(UserActions.LoginUserFailure, (state, { error }) => ({ ...state, isLoading: false, error, response: null})),

    on(UserActions.RegisterUser, (state) => ({ ...state, isLoading: true, error: null, response: null})),
    on(UserActions.RegisterUserSuccess, (state, { response }) => ({ ...state, isLoading: false, response, error: null})),
    on(UserActions.RegisterUserFailure, (state, { error }) => ({ ...state, isLoading: false, error, response: null})),
    );
