export class LocalStorageService {
    static readonly instance = new LocalStorageService();

    localStorageKeyName = "reperioCoreJWT";

    private constructor() {}

    getReperioCoreJWT() {
        try {
            const jwt = localStorage.getItem(this.localStorageKeyName);
            if (jwt == null) {
                return null;
            }
            return jwt;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    setReperioCoreJWT(jwt: string) {
        try {
            if (jwt != null) {
                localStorage.setItem(this.localStorageKeyName, jwt);
            } else {
                localStorage.removeItem(this.localStorageKeyName);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const localStorageService = LocalStorageService.instance;
localStorageService.startEventListener();

