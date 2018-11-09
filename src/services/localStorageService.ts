export const localStorageService = {
    getReperioCoreJWT() {
        try {
            const jwt = localStorage.getItem('reperioCoreJWT');
            if (jwt == null) {
                return null;
            }
            return jwt;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    setReperioCoreJWT(jwt: string) {
        try {
            if (jwt != null) {
                localStorage.setItem('reperioCoreJWT', jwt);
            } else {
                localStorage.removeItem('reperioCoreJWT');
            }
        } catch (e) {
            console.error(e);
        }
    }
}