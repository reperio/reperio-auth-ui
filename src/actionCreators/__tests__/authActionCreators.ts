import {AxiosError} from "axios";

import {authActionTypes} from "../../actionTypes/authActionTypes";
import {State} from "../../store/state";

const mockCoreApiService = {
    coreApiService: {
        authService: {
            getLoggedInUser() {
                return {id: 123}
            },
            generateOTP: jest.fn(),
            validateCurrentJWT: jest.fn(),
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
import SpyInstance = jest.SpyInstance;
import {requestOTP} from "../authActionCreators";


describe("authActionCreators", () => {
    const dispatchMock = jest.fn();
    const baseState: State = {
        auth: {
            isAuthInitialized: false,
            user: null,
            isInProgress: false,
            isSuccessful: false,
            isError: false,
            errorMessage: null,
            otpIsInProgress: false,
            otpIsSuccessful: false,
            otp: null
        }
    };

    describe("submitAuth", () => {
        it("dispatches correct actions when submitted with valid credentials", async () => {
            const state = baseState;
            const getStateMock = jest.fn(() => state);
            await authActionCreators.submitAuth("succeed@reper.io", "password")(dispatchMock, getStateMock);

            expect(dispatchMock).toHaveBeenNthCalledWith(1, {
                type: authActionTypes.AUTH_LOGIN_PENDING
            });

            expect(dispatchMock).toHaveBeenNthCalledWith(2, {
                type: authActionTypes.AUTH_LOGIN_SUCCESSFUL,
                payload: {user: {id: 123}}
            });
        });

        it("dispatches correct actions when submitted with invalid credentials", async () => {
            const state = baseState;
            const getStateMock = jest.fn(() => state);
            await authActionCreators.submitAuth("fail401@reper.io", "password")(dispatchMock, getStateMock);

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

                expect(dispatchMock).toHaveBeenNthCalledWith(2, expect.objectContaining({
                    type: authActionTypes.AUTH_OTP_ERROR
                }));

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