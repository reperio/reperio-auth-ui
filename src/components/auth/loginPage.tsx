import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Wrapper } from '@reperio/ui-components';
import {StateAuth} from "../../store/state";
import {LoginReperioLogo} from "./loginReperioLogo";
import {LoginForm} from "./loginForm";

export interface LoginFormData {
    primaryEmailAddress: string;
    password: string;
}

export interface LoginPageProps {
    navigateToForgotPassword(): void;
    onSubmit(x: LoginFormData): void;
    initialValues: LoginFormData;
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string;
}

export type CombinedProps = LoginPageProps & InjectedFormProps<LoginFormData, LoginPageProps>;

export const LoginPage: React.SFC<CombinedProps> = (props: CombinedProps) => (
    <div className="auth-form-container">
        <div className="r-wrapper-child " style={{flex: 1, maxWidth: "none"}}>
            <LoginReperioLogo />
        </div>
        <div className="r-wrapper-child " style={{flex: 1}}>
            <div style={{maxWidth: 600, margin: '0 auto'}}>
                <LoginForm onSubmit={props.handleSubmit(props.onSubmit)}
                        navigateToForgotPassword={props.navigateToForgotPassword}
                        isSuccessful={props.isSuccessful}
                        isError={props.isError}
                        errorMessage={props.errorMessage} />
            </div>
        </div>
    </div>
);

export const ConnectedLoginPage = reduxForm<LoginFormData, LoginPageProps>({ form: 'loginForm' })(LoginPage);