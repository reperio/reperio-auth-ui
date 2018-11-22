import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';
import {StateAuth} from "../../store/state";

import repBar from '../../assets/rep-bar.svg';
import reperioLogo from '../../assets/reperio.png';
import graphic from '../../assets/graphic.svg';

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

const rowMargin = "4em";

const LoginForm: React.SFC<CombinedProps> = (props: CombinedProps) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div style={{width: "100%", height: "54px", overflow: "hidden"}}>
            <img src={repBar} style={{width: "100%" }} />
        </div>
        <Wrapper>
            <div className="r-wrapper-child " style={{flex: '4 0 680px', maxWidth: "none"}}>
                <div className="row" style={{marginTop: rowMargin, marginBottom: rowMargin}}>
                    <div className="r-row-child" style={{textAlign: "center"}}>
                        <img src={reperioLogo} style={{width: "400px"}} />
                    </div>
                </div>
                <div className="row" style={{marginTop: rowMargin, marginBottom: rowMargin}}>
                    <p className="r-row-child" style={{textAlign: "center", fontFamily: "'Jaldi', sans-serif", fontSize: "20pt", color: "rgb(80,119,177)"}}>
                        TECHNOLOGY SERVICE BUILT FOR REAL PEOPLE
                    </p>
                </div>
                <div className="row" style={{marginTop: rowMargin, marginBottom: rowMargin}}>
                    <div className="r-row-child" style={{textAlign: "center"}}>
                        <img src={graphic} style={{width: "600px"}} />
                    </div>
                </div>
            </div>
            <div className="r-wrapper-child " style={{flex: '1 1 auto', maxWidth: "none"}} />
            <div className="r-wrapper-child " style={{flex: '0 0 480px', maxWidth: "none"}}>
                <div className="row" style={{marginTop: rowMargin}}>
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

export const ConnectedLoginForm = reduxForm<LoginFormData, LoginFormProps>({ form: 'loginForm' })(LoginForm);