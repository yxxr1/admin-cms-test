export function debounce<T extends any[]>(func: (...args: T) => any, time: number) {
    let timeout: NodeJS.Timeout;

    return (...args: T) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => func(...args), time);
    };
}
