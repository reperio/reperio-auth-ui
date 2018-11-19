import {setAuthToken} from "../actionCreators/authActionCreators"
import { store } from "../store/store";
import {ReperioCoreConnector} from "reperio-core-connector";

declare const API_URL: string;

export const coreApiService = new ReperioCoreConnector({
    baseURL: API_URL,
    getAuthToken: () => store.getState().auth.reperioCoreJWT,
    onAuthTokenReceived: async authToken => setAuthToken(authToken)(store.dispatch, store.getState)
});