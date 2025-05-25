export interface ErrorResponse {
    message: string;
    status: string;
}

export interface SuccessResponse<T> {
    data: T;
    status: string;
}
