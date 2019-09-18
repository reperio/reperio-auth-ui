import * as React from 'react';
import {shallow} from 'enzyme';

const mockAuthActionCreators = { };
jest.mock("../../../actionCreators/authActionCreators", () => mockAuthActionCreators);

import LoadingSpinner from "../../loadingSpinner";
import ExternalRedirect from "../../externalRedirect";
import {CombinedProps as HandleOTPProps, HandleOTP} from "../handleOTP";

describe("HandleOTP", () => {
    const baseProps: HandleOTPProps = {
        actions: {
            requestOTP: jest.fn()
        },
        auth: {
            isAuthInitialized: false,
            user: null,
            isInProgress: false,
            isSuccessful: false,
            isError: false,
            errorMessage: null,
            otpIsInProgress: false,
            otpIsSuccessful: false,
            otp: "abcdefg-test-otp"
        },
        next: null
    };

    it('calls actions.requestOTP() on componentDidMount if otpIsSuccessful is false', () => {
        const props: HandleOTPProps = {
            ...baseProps
        };

        const wrapper = shallow(
            <HandleOTP {...props} />
        );

        wrapper.instance().componentDidMount();

        expect(props.actions.requestOTP).toHaveBeenCalled();
    });

    it('shows loading spinner if otpIsSuccessful is false', () => {
        const props: HandleOTPProps = {
            ...baseProps
        };

        const wrapper = shallow(
            <HandleOTP {...props} />
        );

        expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it('shows ExternalRedirect if otpIsSuccessful is true', () => {
        const props: HandleOTPProps = {
            ...baseProps,
            auth: {
                ...baseProps.auth,
                otpIsSuccessful: true,
                otp: "test-otp"
            },
            next: "test-next"
        };

        const wrapper = shallow(
            <HandleOTP {...props} />
        );

        expect(wrapper.find(ExternalRedirect).find({otp: "test-otp", next: "test-next"})).toHaveLength(1);
    });
});