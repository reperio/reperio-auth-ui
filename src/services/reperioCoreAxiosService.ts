import axiosStatic from "axios";
import {setAuthToken} from "../actionCreators/authActionCreators"
import { store } from "../store/store";

declare const CORE_API_URL: string;

export const axios = axiosStatic.create({baseURL: CORE_API_URL});

axios.interceptors.request.use(async config => {
    const state = store.getState();
    const authToken = state.auth.reperioCoreJWT;
    if (authToken != null) {
        config.headers.authorization = `Bearer ${authToken}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {
    if (response.headers != null && response.headers.authorization != null && response.headers.authorization.slice(0, 6) === "Bearer") {
        const authToken = response.headers.authorization.slice(7);
        await setAuthToken(authToken)(store.dispatch, store.getState());
    }
    return response;
});