export interface AppState {
  user: UserStateType;
  auth: AuthStateType;
}

export interface UserStateType {
  isLoading?: boolean;
  success: boolean;
  user: UserInfoType;
  message?: string;
}

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

export type RegisterUserType = Pick<User, 'name' | 'email' | 'password'>;

export type LoginUserType = Pick<User, 'email' | 'password'>;

export type UserInfoType = Omit<
  User,
  'password' | 'confirmPassword' | 'termsAndConditions' | 'rememberMe'
>;

export interface AuthStateType {
  success: boolean;
  message: string;
  accessToken: {
    value: string;
    expiration: number;
  };
  refreshToken: {
    value: string;
    expiration: number;
  };
}

export interface ClientOrders {
  name: string;
  orderId: string;
  date: string;
  customerName: string;
  status: string;
  amount: number;
}

export interface AlertProps {
  status: "success" | "error";
  title: string;
  message: string;
  display: boolean;
}