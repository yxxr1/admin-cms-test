import {create} from "zustand";
import {persist} from 'zustand/middleware'
import type {Product} from "../types.ts";

interface Pagination {
    page: number;
    pageSize: number;
}
interface Sort {
    field: string;
    sort: 'asc' | 'desc' | null | undefined;
}

interface ProductsTableState {
    products: Product[];
    setProducts: (data: Product[]) => void;
    productsCount: number;
    setProductsCount(value: number): void;
    pagination: Pagination;
    changePagination: (pagination: Pagination) => void;
    sort: readonly Sort[];
    changeSort: (sort: readonly Sort[]) => void;
    search: string;
    setSearch: (search: string) => void;
    isLoading: boolean;
    toggleIsLoading: () => void;
}

const DEFAULT_PAGINATION = { page: 0, pageSize: 5 };

export const useProductsTableStore = create<ProductsTableState>()(persist((set) => ({
    products: [],
    productsCount: 0,
    setProductsCount: (value) => set({ productsCount: value }),
    setProducts: (products) => set({ products }),
    pagination: DEFAULT_PAGINATION,
    changePagination: (pagination) => set({ pagination }),
    sort: [],
    changeSort: (sort) => set({ sort }),
    search: '',
    setSearch: (search: string) => set((state) => ({ search, pagination: { ...state.pagination, page: 0 } })),
    isLoading: false,
    toggleIsLoading: () => set((state) => ({ isLoading: !state.isLoading })),
}), {
    name: 'products-table',
    partialize: (state) => ({ sort: state.sort }),
}))
