function debounce(callback: Function, delay: number) {
    let timeout: number;
    return function (...args: any) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    };
}

export default debounce;
