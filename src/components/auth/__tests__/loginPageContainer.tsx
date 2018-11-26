import * as React from 'react';
import {shallow} from 'enzyme';

const mockAuthActionCreators = { };
jest.mock("../../../actionCreators/authActionCreators", () => mockAuthActionCreators);

import {CombinedProps as LoginPageContainerProps, LoginPageContainer, RepBar} from "../loginPageContainer";
import LoadingSpinner from "../../loadingSpinner";
import {ConnectedLoginPage, LoginFormData} from "../loginPage";
import SpyInstance = jest.SpyInstance;
import ExternalRedirect from "../../externalRedirect";

describe("LoginPageContainer", () => {
    const baseProps: LoginPageContainerProps = {
        actions: {
            submitAuth: jest.fn(),
            initializeAuth: jest.fn()
        },
        auth: {
            isAuthInitialized: false,
            reperioCoreJWT: null,
            isInProgress: false,
            isSuccessful: false,
            isError: false,
            errorMessage: null,
            otpIsInProgress: false,
            otpIsSuccessful: false,
            otp: "abcdefg-test-otp"
        },
        location: {
            search: ""
        }
    } as any;

    const onSubmitMockReturnValue = "onSubmitReturnValue";
    const navigateToForgotPasswordMockReturnValue = "onSubmitReturnValue";
    let onSubmitMock: SpyInstance;
    let navigateToForgotPasswordMock: SpyInstance;

    beforeEach(() => {
        onSubmitMock = jest.spyOn(LoginPageContainer.prototype, "onSubmit")
            .mockReturnValue(onSubmitMockReturnValue);
        navigateToForgotPasswordMock = jest.spyOn(LoginPageContainer.prototype, "navigateToForgotPassword")
            .mockReturnValue(navigateToForgotPasswordMockReturnValue);
    });

    afterEach(() => {
        onSubmitMock.mockRestore();
        navigateToForgotPasswordMock.mockRestore();
    });

    it('shows repbar', () => {
        const props: LoginPageContainerProps = {
            ...baseProps
        } as any;

        const wrapper = shallow(
            <LoginPageContainer {...props} />
        );

        expect(wrapper.find(RepBar)).toHaveLength(1);
    });

    it('calls actions.initializeAuth() on componentDidMount if isAuthInitialized is false', () => {
        const props: LoginPageContainerProps = {
            ...baseProps
        } as any;

        const wrapper = shallow(
            <LoginPageContainer {...props} />
        );

        wrapper.instance().componentDidMount();

        expect(props.actions.initializeAuth).toHaveBeenCalled();
    });

    it('shows loading spinner if auth not initialized', () => {
        const props: LoginPageContainerProps = {
            ...baseProps
        } as any;

        const wrapper = shallow(
            <LoginPageContainer {...props} />
        );

        expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it('shows ConnectedLoginPage if auth initialized', () => {
        const props: LoginPageContainerProps = {
            ...baseProps,
            auth: {
                ...baseProps.auth,
                isAuthInitialized: true
            }
        } as any;

        const wrapper = shallow(
            <LoginPageContainer {...props} />
        );

        console.log(wrapper.debug());

        expect(wrapper.find(ConnectedLoginPage)).toHaveLength(1);

        const connectedLoginPageWrapper = wrapper.find(ConnectedLoginPage).first();
        const connectedLoginPageProps = connectedLoginPageWrapper.props();
        expect(connectedLoginPageProps.isSuccessful).toBe(props.auth.isSuccessful);
        expect(connectedLoginPageProps.isError).toBe(props.auth.isError);
        expect(connectedLoginPageProps.errorMessage).toBe(props.auth.errorMessage);

        const testOnSubmitArgument: LoginFormData = "testOnSubmitArgument" as any;
        expect(connectedLoginPageProps.onSubmit(testOnSubmitArgument)).toBe(onSubmitMockReturnValue);
        expect(onSubmitMock).toHaveBeenCalledWith(testOnSubmitArgument);

        expect(connectedLoginPageProps.navigateToForgotPassword()).toBe(navigateToForgotPasswordMockReturnValue);
        expect(navigateToForgotPasswordMock).toHaveBeenCalledWith();
    });

    it('shows LoadingSpinner if auth in progress', () => {
        const props: LoginPageContainerProps = {
            ...baseProps,
            auth: {
                ...baseProps.auth,
                isAuthInitialized: true,
                isInProgress: true
            }
        } as any;

        const wrapper = shallow(
            <LoginPageContainer {...props} />
        );

        expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it('shows LoadingSpinner if auth otp in progress', () => {
        const props: LoginPageContainerProps = {
            ...baseProps,
            auth: {
                ...baseProps.auth,
                isAuthInitialized: true,
                otpIsInProgress: true
            }
        } as any;

        const wrapper = shallow(
            <LoginPageContainer {...props} />
        );

        expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it('shows ExternalRedirect for otp if auth otp is successful', () => {
        const props: LoginPageContainerProps = {
            ...baseProps,
            auth: {
                ...baseProps.auth,
                isAuthInitialized: true,
                otpIsSuccessful: true
            }
        } as any;

        const nextMock = "http://next.url";
        const getQueryParamsMock = jest.spyOn(LoginPageContainer.prototype, "getQueryParams")
            .mockReturnValue({next: nextMock, useOtp: true});

        try {
            const wrapper = shallow(
                <LoginPageContainer {...props} />
            );

            expect(wrapper.find(ExternalRedirect).find({otp: props.auth.otp, next: nextMock})).toHaveLength(1);
        } finally {
            getQueryParamsMock.mockRestore();
        }
    });

    it('shows ExternalRedirect if auth is successful', () => {
        const props: LoginPageContainerProps = {
            ...baseProps,
            auth: {
                ...baseProps.auth,
                isAuthInitialized: true,
                isSuccessful: true
            }
        } as any;

        const nextMock = "http://next.url";
        const getQueryParamsMock = jest.spyOn(LoginPageContainer.prototype, "getQueryParams")
            .mockReturnValue({next: nextMock, useOtp: false});

        try {
            const wrapper = shallow(
                <LoginPageContainer {...props} />
            );

            expect(wrapper.find(ExternalRedirect).find({next: nextMock})).toHaveLength(1);
        } finally {
            getQueryParamsMock.mockRestore();
        }
    });
});