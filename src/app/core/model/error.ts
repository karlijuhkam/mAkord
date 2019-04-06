export interface ErrorResponse {
    error: ErrorContent;
}

interface ErrorContent {
    errorCode: string;
    errorDescription: string;
}