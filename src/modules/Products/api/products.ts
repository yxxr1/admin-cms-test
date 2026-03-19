import {fetch} from "@/helpers/fetch.ts";
import type {Product} from "../types.ts";

type Response = {
    products: Product[];
    limit: number;
    skip: number;
    total: number;
};

interface Params {
    query?: string;
    offset?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc' | null | undefined;
}

export const getProducts = ({ query, offset, limit, sortBy, order }: Params) => {
    return fetch<Response>('products/search', { q: query, limit, skip: offset, sortBy, order });
}
