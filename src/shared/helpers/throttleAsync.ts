export function throttleAsync<T extends any[]>(func: (...args: T) => Promise<void>) {
    let lock = false;

    return async (...args: T) => {
        if (!lock) {
            try {
                lock = true;
                await func(...args);
            } finally {
                lock = false;
            }
        }
    };
}
