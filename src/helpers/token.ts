interface Tokens {
    accessToken: string;
    refreshToken: string;
}

const STORAGE_KEY = 'auth';

export const setIsSaveSession = (isSave: boolean) => {
    localStorage.setItem(`${STORAGE_KEY}.isSave`, isSave.toString());
}
const getStorage = () => localStorage.getItem(`${STORAGE_KEY}.isSave`) === 'true' ? localStorage : sessionStorage;

export const setTokens = (tokens: Tokens) => {
    const storage = getStorage();
    storage.setItem(`${STORAGE_KEY}.accessToken`, tokens.accessToken);
    storage.setItem(`${STORAGE_KEY}.refreshToken`, tokens.refreshToken);
}

export const getAccessToken = () => (
    getStorage().getItem(`${STORAGE_KEY}.accessToken`)
);
export const getRefreshToken = () => (
    getStorage().getItem(`${STORAGE_KEY}.refreshToken`)
);
