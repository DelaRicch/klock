
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

export interface TokenType {
  value: string;
  expiration: number;
}

export interface AuthResponseType {
  message: string;
  token: {
    accessToken: TokenType;
    refreshToken: TokenType;
  }
  user: UserInfoType;
}

export interface LoginResponse {
  LoginUser: AuthResponseType;
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
  status: 'success' | 'error';
  title: string;
  message: string;
  display: boolean;
}

export interface DropdownItemProp {
  name: string;
  path?: string;
}


export type PaginationItem = number | '...';