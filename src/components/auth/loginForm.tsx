import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';

interface LoginProps {
    navigateToForgotPassword(): void;
    onSubmit(): void;
    authSession: any; //StateAuthSession;
}

type Form = LoginProps & InjectedFormProps<any>;

const LoginForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Wrapper>
            <div className="r-wrapper-child ">
                {props.authSession.isError ?
                    <div className="row">
                        <div className="r-row-child">
                            <p className="alert alert-danger">{props.authSession.errorMessage}</p>
                        </div>
                    </div>
                : null}
                <div className="row">
                    <div className="r-row-child">
                        <h2>Login</h2>
                        <hr />
                    </div>
                </div>
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

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'loginForm' })(LoginForm) as any;