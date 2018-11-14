export class LocalStorageService {
    static readonly instance = new LocalStorageService();

    localStorageKeyName = "reperioCoreJWT";
    subscribers: ((jwt: string, source: "internal" | "external") => any)[] = [];

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
            this.dispatchToSubscribers("internal");
        } catch (e) {
            console.error(e);
        }
    }

    subscribe(method: (jwt: string, source: "internal" | "external") => any) {
        if (this.subscribers.includes(method)) {
            return;
        }
        this.subscribers.push(method);
    }

    unsubscribe(method: (jwt: string) => any) {
        if (!this.subscribers.includes(method)) {
            return;
        }
        this.subscribers.splice(this.subscribers.indexOf(method));
    }

    dispatchToSubscribers(source: "internal" | "external") {
        const jwt = this.getReperioCoreJWT();
        this.subscribers.forEach(x => x(jwt, source));
    }

    startEventListener() {
        window.addEventListener("storage", e => {
            if (e.storageArea !== localStorage || e.key !== this.localStorageKeyName) {
                return;
            }

            this.dispatchToSubscribers("external");
        });
    }
}

export const localStorageService = LocalStorageService.instance;
localStorageService.startEventListener();

