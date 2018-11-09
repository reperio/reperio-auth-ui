import {Dispatch} from "react-redux";
import { authService } from "../services/authService";
import {State} from "../store/state";
import {authActionTypes} from "../actionTypes/authActionTypes";

export const setAuthToken = (authToken: string, forceActionDispatch = false) => async (dispatch: Dispatch<any>, getState: () => State) => {
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
};