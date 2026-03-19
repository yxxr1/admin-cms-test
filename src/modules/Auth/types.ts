export interface FormData {
    username: string;
    password: string;
}

export type FormErrors = {
    [T in keyof FormData]?: string;
}

export interface User {
    id: number;
    username: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
