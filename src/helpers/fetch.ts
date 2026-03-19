import {COMMON_CONFIG} from "@/config/common.ts";
import {getAccessToken, getRefreshToken, setTokens} from "@/helpers/token.ts";
import {EXPIRES_MINS} from "@/const/token";
import type {TokenPair} from "@/modules/Auth";

export class HttpError extends Error {
    status: number;

    constructor(status: number, message?: string) {
        super(message);
        this.status = status;
    }
}

const refreshTokens = async () => {
    const refreshToken = getRefreshToken();
    const tokenPair: TokenPair = await window.fetch(`${COMMON_CONFIG.API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, expiresInMins: EXPIRES_MINS }),
    }).then(async (res) => {
        const json = await res.json();

        if (res.status > 399) {
            throw new HttpError(res.status, json.message);
        }

        return json;
    });
    setTokens(tokenPair);
}

export const fetch = async <T>(path: string, payload?: object, method: string = 'GET', noRefresh?: boolean): Promise<T> => {
    const token = getAccessToken();
    let params = '';

    if (method === 'GET' && payload) {
        const searchParams = new URLSearchParams();
        Object.entries(payload).forEach(([key ,value]) => value !== undefined && searchParams.set(key, value));
        params = '?' + searchParams.toString();
    }

    return window.fetch(`${COMMON_CONFIG.API_URL}/${path}${params}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...(method !== 'GET' && payload ? { body: JSON.stringify(payload) } : {}),
        // credentials: 'include'
    }).then(async (res) => {
        if (!noRefresh && res.status === 401 && getRefreshToken()) {
            await refreshTokens();
            return fetch<T>(path, payload, method, true);
        }

        const json = await res.json();

        if (res.status > 399) {
            throw new HttpError(res.status, json.message);
        }

        return json;
    })
}