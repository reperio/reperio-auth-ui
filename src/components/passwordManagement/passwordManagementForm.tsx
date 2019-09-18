import React, {FormEvent} from 'react'
import { Field } from 'redux-form';
import { TextboxElement, ButtonElement, ProtectedTextboxElement } from '@reperio/ui-components';

const rowMargin = "4em";

export const ResetPasswordFormHeader = () => (
    <div className="row" style={{marginTop: rowMargin}}>
        <div className="r-row-child">
            <h2>Reset Password</h2>
            <hr />
        </div>
    </div>
);

export const CreatePasswordFormHeader = () => (
    <div className="row" style={{marginTop: rowMargin}}>
        <div className="r-row-child">
            <h2>Create Password</h2>
            <hr />
        </div>
    </div>
);

export const PasswordManagementFormFields = () => (
    <>
        <div className="row">
            <div className="r-row-child">
                <Field name="password" placeholder="Enter New Password" type="password" component={ProtectedTextboxElement} />
            </div>
        </div>
        <div className="row">
            <div className="r-row-child">
                <Field name="confirmPassword" placeholder="Confirm New Password" type="password" component={ProtectedTextboxElement} />
            </div>
        </div>
        <div className="row">
            <div className="r-row-child">
                <ButtonElement type="submit" name="signin" color="success" text="Submit" />
            </div>
        </div>
    </>
);


export interface PasswordManagementFormProps {
    onSubmit(e: FormEvent): void;
    isSuccessful: boolean;
    isError: boolean;
    createPassword: boolean;
    errorMessage: string;
}

export const PasswordManagementForm = (props: PasswordManagementFormProps) => (
    <form onSubmit={(e) => props.onSubmit(e)}>
        {props.createPassword ? <CreatePasswordFormHeader /> : <ResetPasswordFormHeader />}
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
        <PasswordManagementFormFields />
    </form>
);