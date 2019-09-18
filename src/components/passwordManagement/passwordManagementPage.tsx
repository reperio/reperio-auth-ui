import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Wrapper } from '@reperio/ui-components';
import {StateAuth} from "../../store/state";
import {LoginReperioLogo} from "../auth/loginReperioLogo";
import {PasswordManagementForm} from "./passwordManagementForm";

export interface PasswordManagementFormData {
    password: string;
    confirmPassword: string;
}

export interface PasswordManagementPageProps {
    onSubmit(x: PasswordManagementFormData): void;
    isSuccessful: boolean;
    isError: boolean;
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
            <div style={{maxWidth: 600, margin: '0 auto'}}>
                <PasswordManagementForm onSubmit={props.handleSubmit(props.onSubmit)}
                       isSuccessful={props.isSuccessful}
                       isError={props.isError}
                       createPassword={props.createPassword}
                       errorMessage={props.errorMessage} />
            </div>
        </div>
    </div>
);

export const ConnectedPasswordManagementPage = reduxForm<PasswordManagementFormData, PasswordManagementPageProps>({ form: 'passwordManagementForm' })(PasswordManagementPage);