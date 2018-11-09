import { configureStore } from "./configureStore";
import { observeStore } from "./observeStore";
import { localStorageService } from "../services/localStorageService";

export const store = configureStore({
    auth: {
        reperioCoreJWT: localStorageService.getReperioCoreJWT()
    }
});

observeStore(store, state => state.auth.reperioCoreJWT, reperioCoreJWT => {
    localStorageService.setReperioCoreJWT(reperioCoreJWT);
});