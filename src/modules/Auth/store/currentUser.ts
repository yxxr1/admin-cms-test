import {create} from "zustand"
import type {User} from "../types.ts";
import {getMe} from "@/modules/Auth/api/getMe.ts";
import {throttleAsync} from "@/shared/helpers/throttleAsync.ts";

interface CurrentUserStoreState {
    user?: User | null;
    fetchUser: () => Promise<void>;
}

export const useCurrentUserStore = create<CurrentUserStoreState>((set) => ({
    user: undefined,
    fetchUser: throttleAsync(async () => {
        try {
            const user = await getMe();
            set({ user });
        } catch {
            set({ user: null });
        }
    })
}))