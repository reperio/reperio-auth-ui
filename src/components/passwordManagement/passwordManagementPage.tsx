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
    <Wrapper>
        <div className="r-wrapper-child " style={{flex: '4 0 680px', maxWidth: "none"}}>
            <LoginReperioLogo />
        </div>
        <div className="r-wrapper-child " style={{flex: '1 1 auto', maxWidth: "none"}} />
        <div className="r-wrapper-child " style={{flex: '0 0 480px', maxWidth: "none"}}>
            <PasswordManagementForm onSubmit={props.handleSubmit(props.onSubmit)}
                       isSuccessful={props.isSuccessful}
                       isError={props.isError}
                       createPassword={props.createPassword}
                       errorMessage={props.errorMessage} />
        </div>
    </Wrapper>
);

export const ConnectedPasswordManagementPage = reduxForm<PasswordManagementFormData, PasswordManagementPageProps>({ form: 'passwordManagementForm' })(PasswordManagementPage);