import { authActionTypes } from "../actionTypes/authActionTypes";
import { StateAuth, initialState } from "../store/state";

export function authReducer(state: StateAuth = initialState.auth, action: {type: string, payload: any}): StateAuth {
    switch (action.type) {
        case authActionTypes.AUTH_SET_TOKEN: {
            const {authToken} = action.payload;
            return {
                reperioCoreJWT: authToken
            };
        }
        case authActionTypes.AUTH_CLEAR_TOKEN: {
            return {
                reperioCoreJWT: null
            };
        }
        default: {
            return state;
        }
    }
}