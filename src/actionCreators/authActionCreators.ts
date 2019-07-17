import {Dispatch} from "react-redux";
import {State} from "../store/state";
import {authActionTypes} from "../actionTypes/authActionTypes";
import {getErrorMessageFromStatusCode} from "./errorMessageHelper";
import {coreApiService} from "../services/coreApiService";
import {history} from "../store/history";

export const isTokenExpired = (token: {exp: number}): boolean => {
    const currentTimestamp = (new Date()).getTime() / 1000;
    return currentTimestamp >= token.exp;
};

export const initializeAuth = () => async (dispatch: Dispatch<State>, getState: () => State) => {
    const state = getState();

    if (state.auth.reperioCoreJWT != null) {
        try {
            await coreApiService.authService.validateCurrentJWT();
            dispatch({
                type: authActionTypes.AUTH_LOGIN_SUCCESSFUL
            });
        } catch (e) {
            if (e.response.status !== 401) {
                console.error(e);
            }
            dispatch({
                type: authActionTypes.AUTH_CLEAR_TOKEN
            });
        }
    } else {
        dispatch({
            type: authActionTypes.AUTH_CLEAR_TOKEN
        });
    }
};

export const setAuthToken = (authToken: string) => async (dispatch: Dispatch<State>, getState: () => State) => {
    const state = getState();
    const oldAuthToken = state.auth.reperioCoreJWT;

    const parsedToken = authToken == null ? null : coreApiService.authService.parseJwt(authToken);

    if (parsedToken != null && !isTokenExpired(parsedToken)) {
        // if the provided authToken is not null and it's not expired...

        if (authToken !== oldAuthToken) {
            dispatch({
                type: authActionTypes.AUTH_SET_TOKEN,
                payload: {authToken}
            });
        }
    } else {
        // if the provided authToken is null or it's expired...

        dispatch({
            type: authActionTypes.AUTH_CLEAR_TOKEN
        });
    }
};

export const submitAuth = (primaryEmailAddress: string, password: string) => async (dispatch: Dispatch<State>, getState: () => State) => {
    dispatch({
        type: authActionTypes.AUTH_LOGIN_PENDING
    });

    try {
        await coreApiService.authService.login(primaryEmailAddress, password);

        dispatch({
            type: authActionTypes.AUTH_LOGIN_SUCCESSFUL
        });

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
};

export const requestOTP = () => async (dispatch: Dispatch<State>, getState: () => State) => {
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
};

export const submitForgotPassword = (primaryEmailAddress: string) => async (dispatch: Dispatch<State>, getState: () => State) => {
    dispatch({
        type: authActionTypes.AUTH_FORGOT_PASSWORD_PENDING
    });

    try {
        await coreApiService.authService.forgotPassword(primaryEmailAddress);

        dispatch({
            type: authActionTypes.AUTH_FORGOT_PASSWORD_SUCCESSFUL
        });
    } catch (e) {
        if (e.response.status !== 401) {
            console.error(e);
        }

        dispatch({
            type: authActionTypes.AUTH_FORGOT_PASSWORD_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const submitPasswordManagement = (token: string, password: string, confirmPassword: string, next: string, email: string) => async (dispatch: Dispatch<State>, getState: () => State) => {
    dispatch({
        type: authActionTypes.AUTH_RESET_PASSWORD_PENDING
    });

    try {
        await coreApiService.authService.resetPassword(token, password, confirmPassword);

        dispatch({
            type: authActionTypes.AUTH_RESET_PASSWORD_SUCCESSFUL
        });

        if (next && email) {
            history.push(`/login?next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}`);
        } else if (next) {
            history.push(`/login?next=${encodeURIComponent(next)}`);
        } else if (email) {
            history.push(`/login?email=${encodeURIComponent(email)}`);
        } else {
            history.push('/login');
        }
    } catch (e) {
        if (e.response.status !== 401) {
            console.error(e);
        }

        dispatch({
            type: authActionTypes.AUTH_RESET_PASSWORD_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.resetPassword != null ? e.response.status : null)
            }
        });
    }
}

export const reset = () => async (dispatch: Dispatch<State>) => {
    dispatch({
        type: authActionTypes.AUTH_RESET_UI
    });
}