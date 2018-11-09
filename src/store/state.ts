export interface State {
    auth: StateAuth
}

export interface StateAuth {
    reperioCoreJWT: string;
    isInProgress: boolean;
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string;
}

export const initialState: State = {
    auth: {
        reperioCoreJWT: null,
        isInProgress: false,
        isSuccessful: false,
        isError: false,
        errorMessage: null
    }
};