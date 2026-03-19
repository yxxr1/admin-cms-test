import {create} from "zustand"
import type {FormData} from "../types.ts";

interface AuthFormState extends FormData {
    isSave: boolean;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    toggleIsSave: () => void;
    isSubmitting: boolean;
    setIsSubmitting: (value: boolean) => void;
}

export const useAuthFormStore = create<AuthFormState>((set) => ({
    username: '',
    password: '',
    isSave: false,
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    toggleIsSave: () => set((state) => ({ isSave: !state.isSave })),
    isSubmitting: false,
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}))