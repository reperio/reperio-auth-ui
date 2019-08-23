import {authActionTypes} from "../../actionTypes/authActionTypes";
import {initialState, StateAuth} from "../../store/state";
import {authReducer} from "../authReducer";

describe("authReducer", () => {
    const baseState: StateAuth = {
        isAuthInitialized: false,
        user: null,
        isInProgress: false,
        isSuccessful: false,
        isError: false,
        errorMessage: null,
        otpIsInProgress: false,
        otpIsSuccessful: false,
        otp: null
    };

    it('should return initialState when calling with no action', () => {
        const testInitialState: StateAuth = void(0);
        const action: any = {type: "", payload: null};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject(initialState.auth);
    });

    it('should set user to null when called with AUTH_CLEAR_USER', () => {
        const testInitialState = {
            ...baseState,
            user: {}
        };
        const action = {type: authActionTypes.AUTH_CLEAR_USER, payload: null as any};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject({
            user: null
        });
    });

    it('should set isInProgress to true when called with AUTH_LOGIN_PENDING', () => {
        const testInitialState = baseState;
        const action = {type: authActionTypes.AUTH_LOGIN_PENDING, payload: null as any};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isInProgress: true
        });
    });

    it('should set isSuccessful to true when called with AUTH_LOGIN_SUCCESSFUL', () => {
        const testInitialState = baseState;
        const action = {type: authActionTypes.AUTH_LOGIN_SUCCESSFUL, payload: null as any};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isSuccessful: true
        });
    });

    it('should set isError to true when called with AUTH_LOGIN_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: authActionTypes.AUTH_LOGIN_ERROR, payload: {message: "test error message"}};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isError: true
        });
    });

    it('should set errorMessage when called with AUTH_LOGIN_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: authActionTypes.AUTH_LOGIN_ERROR, payload: {message: "test error message"}};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject({
            errorMessage: "test error message"
        });
    });

    it('should update otp properties when called with AUTH_OTP_PENDING', () => {
        const testInitialState = baseState;
        const action = {type: authActionTypes.AUTH_OTP_PENDING, payload: null as any};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject({
            otpIsInProgress: true,
            otpIsSuccessful: false,
            otp: null
        });
    });

    it('should update otp properties when called with AUTH_OTP_PENDING', () => {
        const testInitialState = baseState;
        const action = {type: authActionTypes.AUTH_OTP_SUCCESSFUL, payload: {otp: "test-otp"}};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject({
            otpIsInProgress: false,
            otpIsSuccessful: true,
            otp: "test-otp"
        });
    });

    it('should update otp properties when called with AUTH_OTP_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: authActionTypes.AUTH_OTP_ERROR, payload: {message: "test-error-message"}};
        const newState = authReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isError: true,
            errorMessage: "test-error-message"
        });
    });
});