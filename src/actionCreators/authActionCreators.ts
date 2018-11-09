import {Dispatch} from "react-redux";
import { authService } from "../services/authService";
import {State} from "../store/state";
import {authActionTypes} from "../actionTypes/authActionTypes";
import {history} from "../store/history";
import {getErrorMessageFromStatusCode} from "./errorMessageHelper";

export function setAuthToken(authToken: string, forceActionDispatch = false) {
    return function (dispatch: Dispatch<State>, getState: () => State) {
        const state = getState();
        const oldAuthToken = state.auth.reperioCoreJWT;
        const oldParsedToken = oldAuthToken == null ? null : authService.parseJwt(oldAuthToken);

        const parsedToken = authToken == null ? null : authService.parseJwt(authToken);

        if (parsedToken != null && Math.round((new Date()).getTime() / 1000) < parsedToken.exp) {
            // if the provided authToken is not null and it's not expired...

            dispatch({
                type: authActionTypes.AUTH_SET_TOKEN,
                payload: {authToken}
            });

            if (forceActionDispatch || oldParsedToken == null || oldParsedToken.currentUserId !== parsedToken.currentUserId) {
                // TODO retrieve user
                // const user: User = (await userService.getUserById(parsedToken.currentUserId)).data;
                // dispatch({
                //     type: authActionTypes.AUTH_SET_TOKEN,
                //     payload: {authToken, user}
                // });
            }
        } else {
            // if the provided authToken is null or it's expired...

            if (forceActionDispatch || oldAuthToken != null) {
                dispatch({
                    type: authActionTypes.AUTH_CLEAR_TOKEN
                });
            }
        }
    }
}

export function submitAuth(primaryEmailAddress: string, password: string) {
    return async function(dispatch: Dispatch<State>) {
        dispatch({
            type: authActionTypes.AUTH_LOGIN_PENDING
        });

        try {
            await authService.login(primaryEmailAddress, password);

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
    }
}