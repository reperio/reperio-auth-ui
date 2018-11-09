export interface State {
    auth: StateAuth
}

export interface StateAuth {
    reperioCoreJWT: string;
}

export const initialState: State = {
    auth: {
        reperioCoreJWT: null
    }
};