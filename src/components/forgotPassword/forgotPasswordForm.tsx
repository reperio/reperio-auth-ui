import React, {FormEvent} from 'react'
import { Field } from 'redux-form';
import { TextboxElement, ButtonElement } from '@reperio/ui-components';

const rowMargin = "4em";

export const ForgotPasswordFormHeader = () => (
    <div className="row" style={{marginTop: rowMargin}}>
        <div className="r-row-child">
            <h2>Forgot Password</h2>
            <hr />
        </div>
    </div>
);

export const ForgotPasswordFormFields = () => (
    <>
        <div className="row">
            <div className="r-row-child">
                <Field name="primaryEmailAddress" placeholder="Email" type="text" component={TextboxElement} />
            </div>
        </div>
        <div className="row">
            <div className="r-row-child">
                <ButtonElement type="submit" name="signin" color="success" text="Submit" />
            </div>
        </div>
    </>
);


export interface ForgotPasswordFormProps {
    onSubmit(e: FormEvent): void;
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string;
}

export const ForgotPasswordForm = (props: ForgotPasswordFormProps) => (
    <form onSubmit={(e) => props.onSubmit(e)}>
        <ForgotPasswordFormHeader />
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
                    <p className="alert alert-success">Submitted. Please check your email for reset password link.</p>
                </div>
            </div>
            : null}
        <ForgotPasswordFormFields />
    </form>
);