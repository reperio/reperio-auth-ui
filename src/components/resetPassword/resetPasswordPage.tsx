import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Wrapper } from '@reperio/ui-components';
import {StateAuth} from "../../store/state";
import {LoginReperioLogo} from "../auth/loginReperioLogo";
import {ResetPasswordForm} from "./resetPasswordForm";

export interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordPageProps {
    onSubmit(x: ResetPasswordFormData): void;
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string;
}

export type CombinedProps = ResetPasswordPageProps & InjectedFormProps<ResetPasswordFormData, ResetPasswordPageProps>;

export const ResetPasswordPage: React.SFC<CombinedProps> = (props: CombinedProps) => (
    <Wrapper>
        <div className="r-wrapper-child " style={{flex: '4 0 680px', maxWidth: "none"}}>
            <LoginReperioLogo />
        </div>
        <div className="r-wrapper-child " style={{flex: '1 1 auto', maxWidth: "none"}} />
        <div className="r-wrapper-child " style={{flex: '0 0 480px', maxWidth: "none"}}>
            <ResetPasswordForm onSubmit={props.handleSubmit(props.onSubmit)}
                       isSuccessful={props.isSuccessful}
                       isError={props.isError}
                       errorMessage={props.errorMessage} />
        </div>
    </Wrapper>
);

export const ConnectedResetPasswordPage = reduxForm<ResetPasswordFormData, ResetPasswordPageProps>({ form: 'resetPasswordForm' })(ResetPasswordPage);