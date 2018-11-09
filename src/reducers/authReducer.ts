import { authActionTypes } from "../actionTypes/authActionTypes";
import { StateAuth, initialState } from "../store/state";

export function authReducer(state: StateAuth = initialState.auth, action: {type: string, payload: any}): StateAuth {
    switch (action.type) {
        case authActionTypes.AUTH_SET_TOKEN: {
            const {authToken} = action.payload;
            return {
                ...state,
                reperioCoreJWT: authToken
            };
        }
        case authActionTypes.AUTH_CLEAR_TOKEN: {
            return {
                ...state,
                reperioCoreJWT: null
            };
        }
        case authActionTypes.AUTH_LOGIN_PENDING: {
            return {
                ...state,
                isInProgress: true,
                isSuccessful: false,
                isError: false,
                errorMessage: null
            }
        }
        case authActionTypes.AUTH_LOGIN_SUCCESSFUL: {
            return {
                ...state,
                isInProgress: false,
                isSuccessful: true,
                isError: false,
                errorMessage: null
            }
        }
        case authActionTypes.AUTH_LOGIN_ERROR: {
            const {message} = action.payload;
            return {
                ...state,
                isInProgress: false,
                isSuccessful: false,
                isError: true,
                errorMessage: message
            }
        }
        default: {
            return state;
        }
    }
}