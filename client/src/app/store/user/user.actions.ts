import { createAction, props } from "@ngrx/store";
import { ApiResponse, User } from "../../../types";

export const LoginUser = createAction("[User] Login User", props<{ response: ApiResponse }>());
export const LoginUserSuccess = createAction("[User] Login User Success", props<{response: ApiResponse }>());
export const LoginUserFailure = createAction("[User] Login User Failure", props<{ error: string }>());

export const RegisterUser = createAction("[User] Register User", props<{ response: ApiResponse }>());
export const RegisterUserSuccess = createAction("[User] Register User Success", props<{ response: ApiResponse }>());
export const RegisterUserFailure = createAction("[User] Register User Failure", props<{ error: string }>());

export const LogoutUser = createAction("[User] Logout User");