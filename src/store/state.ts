export interface State {
    auth: StateAuth
}

export interface StateAuth {
    isAuthInitialized: boolean;
    user: any;
    isInProgress: boolean;
    isSuccessful: boolean;
    isError: boolean;
    isBadToken: boolean;
    errorMessage: string;
    otpIsInProgress: boolean;
    otpIsSuccessful: boolean;
    otp: string;
}

export const initialState: State = {
    auth: {
        isAuthInitialized: false,
        user: null,
        isInProgress: false,
        isSuccessful: false,
        isError: false,
        isBadToken: false,
        errorMessage: null,
        otpIsInProgress: false,
        otpIsSuccessful: false,
        otp: null
    }
};