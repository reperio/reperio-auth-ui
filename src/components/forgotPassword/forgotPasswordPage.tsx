import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Wrapper } from '@reperio/ui-components';
import {StateAuth} from "../../store/state";
import {LoginReperioLogo} from "../auth/loginReperioLogo";
import {ForgotPasswordForm} from "./forgotPasswordForm";

export interface ForgotPasswordFormData {
    primaryEmailAddress: string;
}

export interface ForgotPasswordPageProps {
    onSubmit(x: ForgotPasswordFormData): void;
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string;
}

export type CombinedProps = ForgotPasswordPageProps & InjectedFormProps<ForgotPasswordFormData, ForgotPasswordPageProps>;

export const ForgotPasswordPage: React.SFC<CombinedProps> = (props: CombinedProps) => (
    <Wrapper>
        <div className="r-wrapper-child " style={{flex: '4 0 680px', maxWidth: "none"}}>
            <LoginReperioLogo />
        </div>
        <div className="r-wrapper-child " style={{flex: '1 1 auto', maxWidth: "none"}} />
        <div className="r-wrapper-child " style={{flex: '0 0 480px', maxWidth: "none"}}>
            <ForgotPasswordForm onSubmit={props.handleSubmit(props.onSubmit)}
                       isSuccessful={props.isSuccessful}
                       isError={props.isError}
                       errorMessage={props.errorMessage} />
        </div>
    </Wrapper>
);

export const ConnectedForgotPasswordPage = reduxForm<ForgotPasswordFormData, ForgotPasswordPageProps>({ form: 'forgotPasswordForm' })(ForgotPasswordPage);