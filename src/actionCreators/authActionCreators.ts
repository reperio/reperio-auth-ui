import {Dispatch} from "react-redux";
import {State} from "../store/state";
import {authActionTypes} from "../actionTypes/authActionTypes";
import {getErrorMessageFromStatusCode} from "./errorMessageHelper";
import {coreApiService} from "../services/coreApiService";
import {history} from "../store/history";

export const initializeAuth = () => async (dispatch: Dispatch<State>, getState: () => State) => {
    try {
        const user = await coreApiService.authService.getLoggedInUser();
        dispatch({
            type: authActionTypes.AUTH_INITIALIZED,
            payload: {user}
        });
    } catch {
        dispatch({
            type: authActionTypes.AUTH_INITIALIZED,
            payload: {user: null}
        });
    }
};

export const submitAuth = (primaryEmailAddress: string, password: string) => async (dispatch: Dispatch<State>, getState: () => State) => {
    dispatch({
        type: authActionTypes.AUTH_LOGIN_PENDING
    });

    try {
        await coreApiService.authService.login(primaryEmailAddress, password);
        const user = await coreApiService.authService.getLoggedInUser();

        dispatch({
            type: authActionTypes.AUTH_LOGIN_SUCCESSFUL,
            payload: {user}
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

        dispatch({
            type: authActionTypes.AUTH_OTP_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
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
        if (password !== confirmPassword) {
            dispatch({
                type: authActionTypes.AUTH_RESET_PASSWORD_ERROR,
                payload: { message: 'Error: passwords must match' }
            });
            return;
        } else if (password.length < 8) {
            dispatch({
                type: authActionTypes.AUTH_RESET_PASSWORD_ERROR,
                payload: { message: 'Error: password must be at least 8 characters' }
            });
            return;
        }
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

        let displayError = getErrorMessageFromStatusCode(e.resetPassword != null ? e.response.status : null);

        if (e.response.status === 400 && e.response.data !== 'bad data') {
            displayError = e.response.data;
        }

        dispatch({
            type: authActionTypes.AUTH_RESET_PASSWORD_ERROR,
            payload: {
                message: displayError
            }
        });
    }
}

export const reset = () => async (dispatch: Dispatch<State>) => {
    dispatch({
        type: authActionTypes.AUTH_RESET_UI
    });
}