export const fetchProfile = (username: string): Promise<string> => {
    return new Promise<string>(resolve => {
        setTimeout(() => {resolve(username)}, 1000);
    })
}
