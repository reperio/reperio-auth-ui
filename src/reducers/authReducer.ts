import { authActionTypes } from "../actionTypes/authActionTypes";
import { StateAuth, initialState } from "../store/state";

export function authReducer(state: StateAuth = initialState.auth, action: {type: string, payload: any}): StateAuth {
    switch (action.type) {
        case authActionTypes.AUTH_LOGIN_PENDING: {
            return {
                ...state,
                isInProgress: true,
                isSuccessful: false,
                isError: false,
                errorMessage: null,
                otpIsInProgress: false,
                otpIsSuccessful: false,
                otp: null
            }
        }
        case authActionTypes.AUTH_LOGIN_SUCCESSFUL: {
            const {user} = action.payload;
            return {
                ...state,
                user,
                isAuthInitialized: true,
                isInProgress: false,
                isSuccessful: true,
                isError: false,
                errorMessage: null,
                otpIsInProgress: false,
                otpIsSuccessful: false,
                otp: null
            }
        }
        case authActionTypes.AUTH_INITIALIZED: {
            const {user} = action.payload;
            return {
                ...state,
                user,
                isAuthInitialized: true,
                isInProgress: false,
                isSuccessful: user != null,
                isError: false,
                errorMessage: null,
                otpIsInProgress: false,
                otpIsSuccessful: false,
                otp: null
            }
        }
        case authActionTypes.AUTH_LOGIN_ERROR: {
            const {message} = action.payload;
            return {
                ...state,
                isInProgress: false,
                isSuccessful: false,
                isError: true,
                errorMessage: message,
                otpIsInProgress: false,
                otpIsSuccessful: false,
                otp: null
            }
        }
        case authActionTypes.AUTH_OTP_PENDING: {
            return {
                ...state,
                otpIsInProgress: true,
                otpIsSuccessful: false,
                otp: null
            }
        }
        case authActionTypes.AUTH_OTP_SUCCESSFUL: {
            const {otp} = action.payload;
            return {
                ...state,
                otpIsInProgress: false,
                otpIsSuccessful: true,
                otp
            }
        }
        case authActionTypes.AUTH_OTP_ERROR: {
            const {message} = action.payload;
            return {
                ...state,
                isInProgress: false,
                isSuccessful: false,
                isError: true,
                errorMessage: message,
                otpIsInProgress: false,
                otpIsSuccessful: false
            }
        }
        case authActionTypes.AUTH_FORGOT_PASSWORD_PENDING: {
            return {
                ...state,
                isInProgress: true,
                isSuccessful: false,
                isError: false,
                errorMessage: null,
            }
        }
        case authActionTypes.AUTH_FORGOT_PASSWORD_SUCCESSFUL: {
            return {
                ...state,
                isInProgress: false,
                isSuccessful: true,
                isError: false,
                errorMessage: null,
            }
        }
        case authActionTypes.AUTH_FORGOT_PASSWORD_ERROR: {
            const {message} = action.payload;
            return {
                ...state,
                isInProgress: false,
                isSuccessful: false,
                isError: true,
                errorMessage: message
            }
        }
        case authActionTypes.AUTH_RESET_PASSWORD_PENDING: {
            return {
                ...state,
                isInProgress: true,
                isSuccessful: false,
                isError: false,
                errorMessage: null,
            }
        }
        case authActionTypes.AUTH_RESET_PASSWORD_SUCCESSFUL: {
            return {
                ...state,
                isInProgress: false,
                isError: false,
                errorMessage: null,
            }
        }
        case authActionTypes.AUTH_RESET_PASSWORD_ERROR: {
            const {message} = action.payload;
            return {
                ...state,
                isInProgress: false,
                isSuccessful: false,
                isError: true,
                errorMessage: message
            }
        }
        case authActionTypes.AUTH_RESET_PASSWORD_BAD_TOKEN: {
            const {message} = action.payload;
            return {
                ...state,
                isInProgress: false,
                isSuccessful: false,
                isError: true,
                isBadToken: true,
                errorMessage: message
            }
        }
        case authActionTypes.AUTH_RESET_UI: {
            return {
                ...state,
                isInProgress: false,
                isSuccessful: false,
                isError: false,
                errorMessage: null
            }
        }
        default: {
            return state;
        }
    }
}