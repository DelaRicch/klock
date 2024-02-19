import { createAction, props } from '@ngrx/store';
import { UserStateType } from '@type/types';

export const UserProfile = createAction('[User] User Profile');
export const UserProfileLoading = createAction(
  '[User] User Profile Loading',
  props<{ isLoading: boolean }>()
);
export const UserProfileSuccess = createAction(
  '[User] User Profile Success',
  props<{ res: UserStateType }>()
);
export const UserProfileFailure = createAction(
  '[User] User Profile Failure',
  props<{ error: { message: string; success: boolean } }>()
);


export const LogOut = createAction('[User] Log Out');