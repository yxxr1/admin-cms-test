import {useCurrentUserStore} from "@/modules/Auth/store/currentUser.ts";
import {useEffect} from "react";

export const useCurrentUser = () => {
    const { user, fetchUser } = useCurrentUserStore();

    useEffect(() => {
        if (user === undefined) {
            fetchUser();
        }
    }, [])

    return { user, refetchUser: fetchUser };
}