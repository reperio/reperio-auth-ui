import {Dispatch} from "react-redux";
import {State} from "../store/state";
import {authActionTypes} from "../actionTypes/authActionTypes";
import {getErrorMessageFromStatusCode} from "./errorMessageHelper";
import {coreApiService} from "../services/coreApiService";

export function initializeAuth() {
    return async function (dispatch: Dispatch<State>, getState: () => State) {
        const state = getState();

        if (state.auth.reperioCoreJWT != null) {
            await executeWithLoadedToken()(dispatch, getState);
        } else {
            dispatch({
                type: authActionTypes.AUTH_CLEAR_TOKEN
            });
        }
    }
}

export function setAuthToken(authToken: string) {
    return async function (dispatch: Dispatch<State>, getState: () => State) {
        const state = getState();
        const oldAuthToken = state.auth.reperioCoreJWT;
        const oldParsedToken = oldAuthToken == null ? null : coreApiService.authService.parseJwt(oldAuthToken);

        const parsedToken = authToken == null ? null : coreApiService.authService.parseJwt(authToken);

        if (parsedToken != null && Math.round((new Date()).getTime() / 1000) < parsedToken.exp) {
            // if the provided authToken is not null and it's not expired...

            if (authToken !== oldAuthToken) {
                dispatch({
                    type: authActionTypes.AUTH_SET_TOKEN,
                    payload: {authToken}
                });
            }

            if (oldParsedToken == null || oldParsedToken.currentUserId !== parsedToken.currentUserId) {
                await executeWithLoadedToken()(dispatch, getState);
            }
        } else {
            // if the provided authToken is null or it's expired...

            dispatch({
                type: authActionTypes.AUTH_CLEAR_TOKEN
            });
        }
    }
}

export function executeWithLoadedToken() {
    return async function (dispatch: Dispatch<State>, getState: () => State) {
        await requestOTP()(dispatch, getState);
    }
};

export function submitAuth(primaryEmailAddress: string, password: string) {
    return async function(dispatch: Dispatch<State>, getState: () => State) {
        dispatch({
            type: authActionTypes.AUTH_LOGIN_PENDING
        });

        try {
            await coreApiService.authService.login(primaryEmailAddress, password);

            dispatch({
                type: authActionTypes.AUTH_LOGIN_SUCCESSFUL
            });

            await executeWithLoadedToken()(dispatch, getState);

        } catch (e) {
            if (e.response.status !== 401) {
                console.error(e);
            }
            dispatch({
                type: authActionTypes.AUTH_LOGIN_ERROR,
                payload: {
                    message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
                }
            });
        }
    }
}

export function requestOTP() {
    return async function(dispatch: Dispatch<State>, getState: () => State) {
        dispatch({
            type: authActionTypes.AUTH_OTP_PENDING
        });

        try {
            const {otp} = await coreApiService.authService.generateOTP();

            dispatch({
                type: authActionTypes.AUTH_OTP_SUCCESSFUL,
                payload: {otp}
            });
        } catch (e) {
            if (e.response.status !== 401) {
                console.error(e);
            }

            const state = getState();
            if (state.auth.isAuthInitialized) {
                dispatch({
                    type: authActionTypes.AUTH_OTP_ERROR,
                    payload: {
                        message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
                    }
                });
            } else {
                dispatch({
                    type: authActionTypes.AUTH_CLEAR_TOKEN
                });
            }
        }
    }
}