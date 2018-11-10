export interface State {
    auth: StateAuth
}

export interface StateAuth {
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