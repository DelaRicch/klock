export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
  rememberMe: boolean;
  role: string;
  photo: string;
  location: string;
  gender: string;
}

export type RegisterUserType = Pick<User, "name" | "email" | "password">;

export type LoginUserType = Pick<User, "email" | "password">;

export type UserInfoType = Omit<
  User,
  "password" | "confirmPassword" | "termsAndConditions" | "rememberMe"
>;

export interface AuthResponseType {
  message: string;
  token: string;
}

export interface LoginResponse {
  LoginUser: AuthResponseType;
}

export interface SignUpResponse {
  CreateUser: AuthResponseType;
}
export interface GoogleLoginResponse {
  GoogleOneTap: AuthResponseType;
}

export interface GoogleCallback {
  select_by: string,
  credential: string
}
