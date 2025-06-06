export interface LoginResponse {
    access_token: string;
    status: string;
}

export interface RegisterResponse {
    access_token: string;
    status: string;
}

export interface UserType {
    id: number;
    name: string;
    avatar: string;
}
