import * as React from 'react';
import {shallow} from 'enzyme';
import {LoginForm, LoginFormFields, LoginFormHeader, LoginFormProps} from "../loginForm";
import {Field} from "redux-form";
import {TextboxElement} from "@reperio/ui-components";

it('loginForm should have LoginFormHeader and LoginFormFields', () => {
    const props: LoginFormProps = {
        onSubmit: jest.fn(() => "onSubmitReturnValue"),
        navigateToForgotPassword: jest.fn(() => "navigateToForgotPasswordReturnValue"),
        isSuccessful: false,
        isError: false,
        errorMessage: null
    };

    const wrapper = shallow(
        <LoginForm {...props} />
    );

    expect(wrapper.find("form")).toHaveLength(1);
    expect(wrapper.find(LoginFormHeader)).toHaveLength(1);
    expect(wrapper.find(LoginFormFields)).toHaveLength(1);

    const form = wrapper.find("form").first();
    const formProps = form.props();

    formProps.onSubmit("testEvent" as any);
    expect(props.onSubmit).toHaveBeenCalledWith("testEvent");

    const loginFormFields = wrapper.find(LoginFormFields).first();
    const loginFormFieldsProps = loginFormFields.props();

    loginFormFieldsProps.navigateToForgotPassword();
    expect(props.navigateToForgotPassword).toHaveBeenCalled();
});

it('loginForm should not have error if isError is false', () => {
    const props: LoginFormProps = {
        onSubmit: jest.fn(() => "onSubmitReturnValue"),
        navigateToForgotPassword: jest.fn(() => "navigateToForgotPasswordReturnValue"),
        isSuccessful: false,
        isError: false,
        errorMessage: null
    };

    const wrapper = shallow(
        <LoginForm {...props} />
    );

    expect(wrapper.find(".login-auth-error")).toHaveLength(0);
});

it('loginForm should have error if isError is true', () => {
    const props: LoginFormProps = {
        onSubmit: jest.fn(() => "onSubmitReturnValue"),
        navigateToForgotPassword: jest.fn(() => "navigateToForgotPasswordReturnValue"),
        isSuccessful: false,
        isError: true,
        errorMessage: null
    };

    const wrapper = shallow(
        <LoginForm {...props} />
    );

    expect(wrapper.find(".login-auth-error")).toHaveLength(1);
});

it('loginForm should not have success if isSuccessful is false', () => {
    const props: LoginFormProps = {
        onSubmit: jest.fn(() => "onSubmitReturnValue"),
        navigateToForgotPassword: jest.fn(() => "navigateToForgotPasswordReturnValue"),
        isSuccessful: false,
        isError: false,
        errorMessage: null
    };

    const wrapper = shallow(
        <LoginForm {...props} />
    );

    expect(wrapper.find(".login-auth-success")).toHaveLength(0);
});

it('loginForm should have success if isSuccessful is true', () => {
    const props: LoginFormProps = {
        onSubmit: jest.fn(() => "onSubmitReturnValue"),
        navigateToForgotPassword: jest.fn(() => "navigateToForgotPasswordReturnValue"),
        isSuccessful: true,
        isError: false,
        errorMessage: null
    };

    const wrapper = shallow(
        <LoginForm {...props} />
    );

    expect(wrapper.find(".login-auth-success")).toHaveLength(1);
});

it('loginFormFields has primaryEmailAddress and password fields', () => {
    const props = {
        navigateToForgotPassword: jest.fn(() => "navigateToForgotPasswordReturnValue")
    };

    const wrapper = shallow(
        <LoginFormFields {...props} />
    );

    expect(wrapper.find(Field).find({name: "primaryEmailAddress", placeholder: "Email", type: "text", component: TextboxElement})).toHaveLength(1);
    expect(wrapper.find(Field).find({name: "password", placeholder: "Password", type: "password", component: TextboxElement})).toHaveLength(1);
});