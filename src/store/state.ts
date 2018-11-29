export interface State {
    auth: StateAuth
}

export interface StateAuth {
    isAuthInitialized: boolean;
    reperioCoreJWT: string;
    isInProgress: boolean;
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string;
    otpIsInProgress: boolean;
    otpIsSuccessful: boolean;
    otp: string;
}

export const initialState: State = {
    auth: {
        isAuthInitialized: false,
        reperioCoreJWT: null,
        isInProgress: false,
        isSuccessful: false,
        isError: false,
        errorMessage: null,
        otpIsInProgress: false,
        otpIsSuccessful: false,
        otp: null
    }
};