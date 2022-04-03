function debounce(callback: Function, delay: number) {
    let timeout: number;
    return function (...args: any) {
        clearTimeout(timeout);
        //@ts-ignore
        timeout = setTimeout(() => callback(...args), delay);
    };
}

export default debounce;
