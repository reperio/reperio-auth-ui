import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Wrapper, ButtonElement } from '@reperio/ui-components';
import {StateAuth} from "../../store/state";
import {LoginReperioLogo} from "../auth/loginReperioLogo";
import {PasswordManagementForm} from "./passwordManagementForm";

export interface PasswordManagementFormData {
    password: string;
    confirmPassword: string;
}

export interface PasswordManagementPageProps {
    onSubmit(x: PasswordManagementFormData): void;
    returnToLogin(): void;
    isSuccessful: boolean;
    isError: boolean;
    isBadToken: boolean;
    createPassword: boolean;
    errorMessage: string;
}

export type CombinedProps = PasswordManagementPageProps & InjectedFormProps<PasswordManagementFormData, PasswordManagementPageProps>;

export const PasswordManagementPage: React.SFC<CombinedProps> = (props: CombinedProps) => (
    <div className="auth-form-container">
        <div className="r-wrapper-child " style={{flex: 1, maxWidth: "none"}}>
            <LoginReperioLogo />
        </div>
        <div className="r-wrapper-child " style={{flex: 1}}>
            { !props.isBadToken ? 
                <div style={{maxWidth: 600, margin: '0 auto'}}>
                    <PasswordManagementForm onSubmit={props.handleSubmit(props.onSubmit)}
                        isSuccessful={props.isSuccessful}
                        isError={props.isError}
                        createPassword={props.createPassword}
                        errorMessage={props.errorMessage} />
                </div>
            : 
                <>
                    <div className="row" style={{marginTop: '4em'}}>
                        <div className="r-row-child">
                            <h2>Bad Token</h2>
                            <hr />
                            <div className="row login-auth-error">
                                <div className="r-row-child">
                                    <p className="alert alert-danger">{props.errorMessage}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="r-row-child">
                                    <ButtonElement type="button" name="signin" color="success" text="Return to Login" onClick={() => props.returnToLogin()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
);

export const ConnectedPasswordManagementPage = reduxForm<PasswordManagementFormData, PasswordManagementPageProps>({ form: 'passwordManagementForm' })(PasswordManagementPage);