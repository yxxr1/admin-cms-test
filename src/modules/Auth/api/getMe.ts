import {fetch} from "@/helpers/fetch.ts";
import type {User} from "../types.ts";

type Response = User;

export const getMe = () => {
    return fetch<Response>('auth/me')
}
