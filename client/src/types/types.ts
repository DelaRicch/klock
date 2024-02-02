export interface AppState {
    user: UserStateType;
    auth: AuthStateType;
  }

export interface UserStateType {
    isLoading?: boolean;
    success: boolean;
    user: User | null;
    message?: string;
}

export interface User {
    id?: string;
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    termsAndConditions?: boolean;
    rememberMe?: boolean;
    role?: string;
    photo?: string;
    location?: string;
    gender?: string;
}

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