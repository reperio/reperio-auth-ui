import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';
import {StateAuth} from "../../store/state";

export interface LoginFormData {
    primaryEmailAddress: string;
    password: string;
}

export interface LoginFormProps {
    navigateToForgotPassword(): void;
    onSubmit(x: LoginFormData): void;
    auth: StateAuth;
}

type CombinedProps = LoginFormProps & InjectedFormProps<LoginFormData, LoginFormProps>;

const LoginForm: React.SFC<CombinedProps> = (props: CombinedProps) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Wrapper>
            <div className="r-wrapper-child ">
                <div className="row">
                    <div className="r-row-child">
                        <h2>Login</h2>
                        <hr />
                    </div>
                </div>
                {props.auth.isError ?
                    <div className="row">
                        <div className="r-row-child">
                            <p className="alert alert-danger">{props.auth.errorMessage}</p>
                        </div>
                    </div>
                    : null}
                {props.auth.isSuccessful ?
                    <div className="row">
                        <div className="r-row-child">
                            <p className="alert alert-success">Success!</p>
                        </div>
                    </div>
                    : null}
                <div className="row">
                    <div className="r-row-child">
                        <Field name="primaryEmailAddress" placeholder="Email" type="text" component={TextboxElement} />
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <Field name="password" placeholder="Password" type="password" component={TextboxElement} />
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <ButtonElement type="submit" name="signin" color="success" text="Sign In" />
                        <ButtonElement type="button" color="neutral" text="Forgot Password" onClick={() => props.navigateToForgotPassword()} />
                    </div>
                </div>
            </div>
        </Wrapper>
    </form>
);

export default reduxForm<LoginFormData, LoginFormProps>({ form: 'loginForm' })(LoginForm);