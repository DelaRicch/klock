import { createAction, props } from "@ngrx/store";
import { AuthStateType } from "../../../types";

export const LoginUser = createAction("[Auth] Login User", props<{ res: AuthStateType }>());
export const LoginUserSuccess = createAction("[Auth] Login User Success", props<{res: AuthStateType }>());
export const LoginUserFailure = createAction("[Auth] Login User Failure", props<{ error: { message: string, success: boolean} }>());

export const RegisterUser = createAction("[Auth] Register User", props<{ res: AuthStateType }>());
// export const RegisterUserSuccess = createAction("[Auth] Register User Success", props<{ res: AuthStateType }>());
// export const RegisterUserFailure = createAction("[Auth] Register User Failure", props<{ error: string }>());

export const LogoutUser = createAction("[Auth] Logout User");