import * as React from 'react';
import {shallow} from 'enzyme';
import {StateAuth} from "../../../store/state";
import {LoginReperioLogo} from "../loginReperioLogo";
import {CombinedProps, LoginPage} from "../loginPage";
import {LoginForm} from "../loginForm";

it('should show login reperio logo and login form', () => {
    const navigateToForgotPassword = jest.fn();
    const onSubmit = jest.fn();
    const handleSubmit = jest.fn(() => "handleSubmitReturnValue");

    const props: CombinedProps = {
        navigateToForgotPassword,
        onSubmit,
        handleSubmit,
        isSuccessful: "isSuccessfulTestValue",
        isError: "isErrorTestValue",
        errorMessage: "errorMessageTestValue",
    } as any;

    const wrapper = shallow(
        <LoginPage {...props} />
    );

    expect(wrapper.find(LoginReperioLogo)).toHaveLength(1);
    expect(wrapper.find(LoginForm)).toHaveLength(1);

    const loginForm = wrapper.find(LoginForm).first();
    const loginFormProps = loginForm.props();

    expect(loginFormProps.onSubmit).toBe("handleSubmitReturnValue");
    expect(handleSubmit).toHaveBeenCalledWith(onSubmit);
    expect(loginFormProps.navigateToForgotPassword).toBe(navigateToForgotPassword);
    expect(loginFormProps.isSuccessful).toBe(props.isSuccessful);
    expect(loginFormProps.isError).toBe(props.isError);
    expect(loginFormProps.errorMessage).toBe(props.errorMessage);
});