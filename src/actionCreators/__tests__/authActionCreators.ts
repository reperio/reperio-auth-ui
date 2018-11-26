import {AxiosError} from "axios";

import {authActionTypes} from "../../actionTypes/authActionTypes";
import {State} from "../../store/state";

const testJwtUser1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDI4MjQ0NzMsImV4cCI6MTU0MjkxMDg3MywiY3VycmVudFVzZXJJZCI6MX0.TCBF85Gx3fZOXJFlQXk7yGTK99lX6KXUPiD0ydateiA"; // created 2018-11-21T18:21:13Z, expires 2018-11-22T18:21:13Z, currentUserId: 1
const testJwtExpired = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDI3MzgwNzMsImV4cCI6MTU0MjgyNDQ3MywiY3VycmVudFVzZXJJZCI6MX0.8xrI-nfpAYT_cDB-AzLdhrIqU6ZX3zeKK2_wUJldFWE"; // created 2018-11-20T18:21:13Z, expires 2018-11-21T18:21:13Z, currentUserId: 1
const testJwtUser2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDI4MjQ0NzMsImV4cCI6MTU0MjkxMDg3MywiY3VycmVudFVzZXJJZCI6Mn0.7zDyFUl1UU3kX7lwiDPKScxonItwh_Dzm-BOvDKxyJc"; // created 2018-11-21T18:21:13Z, expires 2018-11-22T18:21:13Z, currentUserId: 2
const testJwtUser2Secondary = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDI4MjU0NzMsImV4cCI6MTU0MjkxMTg3MywiY3VycmVudFVzZXJJZCI6Mn0.wZukKXxElGN49ynWvA88sGlW3VOdiQl5HILW-O_FJe8"; // created 2018-11-21T18:37:53Z, expires 2018-11-22T18:37:53Z, currentUserId: 2

const mockCoreApiService = {
    coreApiService: {
        authService: {
            parseJwt(token: string) {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');

                return JSON.parse(window.atob(base64));
            },
            generateOTP: jest.fn(),
            async login(primaryEmailAddress: string, password: string) {
                if (primaryEmailAddress === "succeed@reper.io") {
                    return;
                }
                else if (primaryEmailAddress === "fail401@reper.io") {
                    const error: AxiosError = {
                        config: null,
                        name: null,
                        message: null,
                        response: {
                            data: null,
                            status: 401,
                            statusText: null,
                            headers: null,
                            config: null
                        }
                    };
                    throw error;
                } else {
                    const error: AxiosError = {
                        config: null,
                        name: null,
                        message: null,
                        response: {
                            data: null,
                            status: 500,
                            statusText: null,
                            headers: null,
                            config: null
                        }
                    };
                    throw error;
                }
            }
        }
    }
};

jest.mock("../../services/coreApiService", () => mockCoreApiService);

const mockErrorMessageHelper = {
    getErrorMessageFromStatusCode: jest.fn((statusCode: number) => {
        return `error-${statusCode}`;
    })
};

jest.mock("../errorMessageHelper", () => mockErrorMessageHelper);

import * as authActionCreators from "../authActionCreators";
import {executeWithLoadedToken} from "../authActionCreators";
import SpyInstance = jest.SpyInstance;
import {requestOTP} from "../authActionCreators";


describe("authActionCreators", () => {
    const dispatchMock = jest.fn();
    const baseState: State = {
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

    describe("initializeAuth", () => {
        const executeWithLoadedTokenReturnValueMock = jest.fn().mockResolvedValue(null);
        let executeWithLoadedTokenMock: SpyInstance;

        beforeEach(() => {
            executeWithLoadedTokenMock = jest.spyOn(authActionCreators, "executeWithLoadedToken")
                .mockReturnValue(executeWithLoadedTokenReturnValueMock);
        });

        afterEach(() => {
            executeWithLoadedTokenMock.mockRestore();
        });

        it("should dispatch AUTH_CLEAR_TOKEN when state.auth.reperioCoreJWT == null", async () => {
            const state = {
                ...baseState
            };

            const getStateMock = jest.fn(() => state);
            await authActionCreators.initializeAuth()(dispatchMock, getStateMock);

            expect(dispatchMock).toHaveBeenCalledWith({
                type: authActionTypes.AUTH_CLEAR_TOKEN
            });
        });

        it("should dispatch AUTH_LOGIN_SUCCESSFUL and call executeWithLoadedToken when state.auth.reperioCoreJWT != null", async () => {
            const state = {
                ...baseState,
                auth: {
                    ...baseState.auth,
                    reperioCoreJWT: testJwtUser1
                }
            };

            const getStateMock = jest.fn(() => state);
            await authActionCreators.initializeAuth()(dispatchMock, getStateMock);

            expect(dispatchMock).toHaveBeenCalledWith({
                type: authActionTypes.AUTH_LOGIN_SUCCESSFUL
            });

            expect(executeWithLoadedTokenMock).toHaveBeenCalledWith();
            expect(executeWithLoadedTokenReturnValueMock).toHaveBeenCalledWith(dispatchMock, getStateMock);
        });
    });

    describe("setAuthToken", () => {
        let isTokenExpiredMock: SpyInstance;
        const executeWithLoadedTokenReturnValueMock = jest.fn().mockResolvedValue(null);
        let executeWithLoadedTokenMock: SpyInstance;

        beforeEach(() => {
            isTokenExpiredMock = jest.spyOn(authActionCreators, "isTokenExpired")
                .mockImplementation((token: {exp: number}): boolean => {
                    const currentTimestamp = 1542897273; // 2018-11-22T14:34:33Z
                    return currentTimestamp >= token.exp;
                });
            executeWithLoadedTokenMock = jest.spyOn(authActionCreators, "executeWithLoadedToken")
                .mockReturnValue(executeWithLoadedTokenReturnValueMock);
        });

        afterEach(() => {
            isTokenExpiredMock.mockRestore();
            executeWithLoadedTokenMock.mockRestore();
        });

        it("should dispatch AUTH_CLEAR_TOKEN if authToken is null", async () => {
            const state = baseState;

            const getStateMock = jest.fn(() => state);
            await authActionCreators.setAuthToken(null)(dispatchMock, getStateMock);

            expect(dispatchMock).toHaveBeenCalledWith({
                type: authActionTypes.AUTH_CLEAR_TOKEN
            });
        });

        it("should dispatch AUTH_CLEAR_TOKEN if authToken is expired", async () => {
            const state = baseState;

            const getStateMock = jest.fn(() => state);
            await authActionCreators.setAuthToken(testJwtExpired)(dispatchMock, getStateMock);

            expect(dispatchMock).toHaveBeenCalledWith({
                type: authActionTypes.AUTH_CLEAR_TOKEN
            });
        });

        it("should dispatch AUTH_SET_TOKEN if authToken is not expired and is not the current token", async () => {
            const state = baseState;

            const getStateMock = jest.fn(() => state);
            await authActionCreators.setAuthToken(testJwtUser1)(dispatchMock, getStateMock);

            expect(dispatchMock).toHaveBeenCalledWith({
                type: authActionTypes.AUTH_SET_TOKEN,
                payload: {authToken: testJwtUser1}
            });
        });

        it("should not dispatch AUTH_SET_TOKEN if authToken is not expired and is the current token", async () => {
            const state = {
                ...baseState,
                auth: {
                    ...baseState.auth,
                    reperioCoreJWT: testJwtUser1
                }
            };

            const getStateMock = jest.fn(() => state);
            await authActionCreators.setAuthToken(testJwtUser1)(dispatchMock, getStateMock);

            expect(dispatchMock).not.toHaveBeenCalled();
        });

        it("should call executeWithLoadedToken if authToken is not expired and old token is null", async () => {
            const state = baseState;

            const getStateMock = jest.fn(() => state);
            await authActionCreators.setAuthToken(testJwtUser1)(dispatchMock, getStateMock);

            expect(executeWithLoadedTokenMock).toHaveBeenCalledWith();
            expect(executeWithLoadedTokenReturnValueMock).toHaveBeenCalledWith(dispatchMock, getStateMock);
        });

        it("should call executeWithLoadedToken if authToken is not expired and authToken has a different currentUserId than old token", async () => {
            const state = {
                ...baseState,
                auth: {
                    ...baseState.auth,
                    reperioCoreJWT: testJwtUser1
                }
            };

            const getStateMock = jest.fn(() => state);
            await authActionCreators.setAuthToken(testJwtUser2)(dispatchMock, getStateMock);

            expect(executeWithLoadedTokenMock).toHaveBeenCalledWith();
            expect(executeWithLoadedTokenReturnValueMock).toHaveBeenCalledWith(dispatchMock, getStateMock);
        });

        it("shouldn't call executeWithLoadedToken if authToken is not expired and authToken has the same currentUserId as old token", async () => {
            const state = {
                ...baseState,
                auth: {
                    ...baseState.auth,
                    reperioCoreJWT: testJwtUser2
                }
            };

            const getStateMock = jest.fn(() => state);
            await authActionCreators.setAuthToken(testJwtUser2Secondary)(dispatchMock, getStateMock);

            expect(executeWithLoadedTokenMock).not.toHaveBeenCalled();
            expect(executeWithLoadedTokenReturnValueMock).not.toHaveBeenCalled();
        });
    });

    it("should call requestOTP when calling executeWithLoadedToken", async () => {
        const requestOTPReturnValueMock = jest.fn().mockResolvedValue(null);
        const requestOTPMock = jest.spyOn(authActionCreators, "requestOTP")
            .mockReturnValue(requestOTPReturnValueMock);

        try {
            const getStateMock = jest.fn(() => null);

            await authActionCreators.executeWithLoadedToken()(dispatchMock, getStateMock);

            expect(requestOTPReturnValueMock).toHaveBeenCalledWith(dispatchMock, getStateMock);
        } finally {
            requestOTPMock.mockRestore();
        }
    });

    describe("submitAuth", () => {
        const executeWithLoadedTokenReturnValueMock = jest.fn().mockResolvedValue(null);
        let executeWithLoadedTokenMock: SpyInstance;

        beforeEach(() => {
            executeWithLoadedTokenMock = jest.spyOn(authActionCreators, "executeWithLoadedToken")
                .mockReturnValue(executeWithLoadedTokenReturnValueMock);
        });

        afterEach(() => {
            executeWithLoadedTokenMock.mockRestore();
        });

        it("dispatches correct actions when submitted with valid credentials", async () => {
            const state = baseState;
            const getStateMock = jest.fn(() => state);
            await authActionCreators.submitAuth("succeed@reper.io", "password", false)(dispatchMock, getStateMock);

            expect(dispatchMock).toHaveBeenNthCalledWith(1, {
                type: authActionTypes.AUTH_LOGIN_PENDING
            });

            expect(dispatchMock).toHaveBeenNthCalledWith(2, {
                type: authActionTypes.AUTH_LOGIN_SUCCESSFUL
            });
        });

        it("does not call executeWithLoadedToken if requestOtp is false", async () => {
            const state = baseState;
            const getStateMock = jest.fn(() => state);
            await authActionCreators.submitAuth("succeed@reper.io", "password", false)(dispatchMock, getStateMock);

            expect(executeWithLoadedTokenMock).not.toHaveBeenCalled();
        });

        it("does call executeWithLoadedToken if requestOtp is true", async () => {
            const state = baseState;
            const getStateMock = jest.fn(() => state);
            await authActionCreators.submitAuth("succeed@reper.io", "password", true)(dispatchMock, getStateMock);

            expect(executeWithLoadedTokenMock).toHaveBeenCalled();
            expect(executeWithLoadedTokenReturnValueMock).toHaveBeenCalledWith(dispatchMock, getStateMock);
        });

        it("dispatches correct actions when submitted with invalid credentials", async () => {
            const state = baseState;
            const getStateMock = jest.fn(() => state);
            await authActionCreators.submitAuth("fail401@reper.io", "password", false)(dispatchMock, getStateMock);

            expect(dispatchMock).toHaveBeenNthCalledWith(1, {
                type: authActionTypes.AUTH_LOGIN_PENDING
            });

            expect(dispatchMock).toHaveBeenNthCalledWith(2, {
                type: authActionTypes.AUTH_LOGIN_ERROR,
                payload: {
                    message: "error-401"
                }
            });
        });
    });

    describe("requestOTP", () => {
        it("dispatches correct actions when otp request is successful", async () => {
            const state = baseState;
            const getStateMock = jest.fn(() => state);

            const generateOTPMockReturnValue = {otp: "123"};
            const generateOTPMock = jest.spyOn(mockCoreApiService.coreApiService.authService, "generateOTP")
                .mockResolvedValue(generateOTPMockReturnValue);

            try {
                await authActionCreators.requestOTP()(dispatchMock, getStateMock);

                expect(dispatchMock).toHaveBeenNthCalledWith(1, {
                    type: authActionTypes.AUTH_OTP_PENDING
                });

                expect(dispatchMock).toHaveBeenNthCalledWith(2, {
                    type: authActionTypes.AUTH_OTP_SUCCESSFUL,
                    payload: generateOTPMockReturnValue
                });

                expect(generateOTPMock).toHaveBeenCalled();
            } finally {
                generateOTPMock.mockRestore();
            }
        });

        it("dispatches correct actions when otp request is unsuccessful and auth is not initialized", async () => {
            const state = baseState;
            const getStateMock = jest.fn(() => state);

            const generateOTPMock = jest.spyOn(mockCoreApiService.coreApiService.authService, "generateOTP")
                .mockRejectedValue({
                    config: null,
                    name: null,
                    message: null,
                    response: {
                        data: null,
                        status: 401,
                        statusText: null,
                        headers: null,
                        config: null
                    }
                });

            try {
                await authActionCreators.requestOTP()(dispatchMock, getStateMock);

                expect(dispatchMock).toHaveBeenNthCalledWith(1, {
                    type: authActionTypes.AUTH_OTP_PENDING
                });

                expect(dispatchMock).toHaveBeenNthCalledWith(2, {
                    type: authActionTypes.AUTH_CLEAR_TOKEN
                });

                expect(generateOTPMock).toHaveBeenCalled();
            } finally {
                generateOTPMock.mockRestore();
            }
        });

        it("dispatches correct actions when otp request is unsuccessful and auth is initialized", async () => {
            const state = {
                ...baseState,
                auth: {
                    ...baseState.auth,
                    isAuthInitialized: true
                }
            };
            const getStateMock = jest.fn(() => state);

            const generateOTPMock = jest.spyOn(mockCoreApiService.coreApiService.authService, "generateOTP")
                .mockRejectedValue({
                    config: null,
                    name: null,
                    message: null,
                    response: {
                        data: null,
                        status: 401,
                        statusText: null,
                        headers: null,
                        config: null
                    }
                });
            try {
                await authActionCreators.requestOTP()(dispatchMock, getStateMock);

                expect(dispatchMock).toHaveBeenNthCalledWith(1, {
                    type: authActionTypes.AUTH_OTP_PENDING
                });

                expect(dispatchMock).toHaveBeenNthCalledWith(2, {
                    type: authActionTypes.AUTH_OTP_ERROR,
                    payload: {
                        message: "error-401"
                    }
                });

                expect(generateOTPMock).toHaveBeenCalled();
            } finally {
                generateOTPMock.mockRestore();
            }
        });
    });
});