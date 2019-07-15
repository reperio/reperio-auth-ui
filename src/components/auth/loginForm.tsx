import React, {FormEvent} from 'react'
import { Field } from 'redux-form';
import { TextboxElement, ButtonElement, ProtectedTextboxElement } from '@reperio/ui-components';

const rowMargin = "4em";

export const LoginFormHeader = () => (
    <div className="row" style={{marginTop: rowMargin}}>
        <div className="r-row-child">
            <h2>Login</h2>
            <hr />
        </div>
    </div>
);

export const LoginFormFields = (props: {navigateToForgotPassword(): void}) => (
    <>
        <div className="row">
            <div className="r-row-child">
                <Field name="primaryEmailAddress" placeholder="Email" type="text" component={TextboxElement} />
            </div>
        </div>
        <div className="row">
            <div className="r-row-child">
                <Field name="password" placeholder="Password" type="password" component={ProtectedTextboxElement} />
            </div>
        </div>
        <div className="row">
            <div className="r-row-child">
                <ButtonElement type="submit" name="signin" color="success" text="Sign In" />
                <ButtonElement type="button" color="neutral" text="Forgot Password" onClick={() => props.navigateToForgotPassword()} />
            </div>
        </div>
    </>
);


export interface LoginFormProps {
    onSubmit(e: FormEvent): void;
    navigateToForgotPassword(): void;
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string;
}

export const LoginForm = (props: LoginFormProps) => (
    <form onSubmit={(e) => props.onSubmit(e)}>
        <LoginFormHeader />
        {props.isError ?
            <div className="row login-auth-error">
                <div className="r-row-child">
                    <p className="alert alert-danger">{props.errorMessage}</p>
                </div>
            </div>
            : null}
        {props.isSuccessful ?
            <div className="row login-auth-success">
                <div className="r-row-child">
                    <p className="alert alert-success">Success!</p>
                </div>
            </div>
            : null}
        <LoginFormFields navigateToForgotPassword={props.navigateToForgotPassword} />
    </form>
);