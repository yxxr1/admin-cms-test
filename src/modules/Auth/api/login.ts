import {fetch} from "@/helpers/fetch.ts";
import {EXPIRES_MINS} from "@/const/token.ts";
import type {TokenPair} from "../types.ts";

type Response = TokenPair;

export const login = (username: string, password: string) => {
    return fetch<Response>('auth/login', { username, password, expiresInMins: EXPIRES_MINS }, 'POST', true)
}
