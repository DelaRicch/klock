export interface UserStateType {
    isLoading: boolean;
    error: string | null;
    user: User | null;
    response: ApiResponse | null;
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

export interface ApiResponse {
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
    user?: User;
}