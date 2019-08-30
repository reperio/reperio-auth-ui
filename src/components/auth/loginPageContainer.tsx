import React from 'react'
import {connect} from "react-redux";
import { RouteComponentProps } from 'react-router';
import {bindActionCreators} from "redux";
import queryString from "query-string";
import {history} from "../../store/history";

import {submitAuth, initializeAuth, reset} from "../../actionCreators/authActionCreators";
import { State } from '../../store/state';

import {ConnectedLoginPage, LoginFormData} from "./loginPage";
import LoadingSpinner from "../loadingSpinner";
import ExternalRedirect from "../externalRedirect";

import repBarSrc from '../../assets/rep-bar.svg';
import {ConnectedHandleOTP} from "./handleOTP";
export const RepBar = () => (
    <div style={{width: "100%", height: "54px", overflow: "hidden"}}>
        <img src={repBarSrc} style={{width: "100%", alignSelf: 'center' }} />
    </div>
);

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionToProps>;
export type CombinedProps = RouteComponentProps & StateProps & DispatchProps;

export class LoginPageContainer extends React.Component<CombinedProps> {

    componentDidMount() {
        if (!this.props.auth.isAuthInitialized) {
            this.props.actions.initializeAuth();
        }
    }

    getQueryParams() {
        const queryParams = queryString.parse(this.props.location.search);
        const next = queryParams.next as string;
        const email = queryParams.email as string;
        const useOtp = "otp" in queryParams;
        return {next, email, useOtp};
    }

    async onSubmit(values: LoginFormData) {
        const queryParams = queryString.parse(this.props.location.search);
        const useOtp = "otp" in queryParams;

        await this.props.actions.submitAuth(values.primaryEmailAddress, values.password);
    };

    async navigateToForgotPassword() {
        history.push('/forgotPassword');
        await this.props.actions.reset();
    };

    render() {
        const {next, email, useOtp} = this.getQueryParams();
        const initialValues: LoginFormData = {
            primaryEmailAddress: (email || ''),
            password: ''
        }

        return (
            <React.Fragment>
                <RepBar />
                {this.props.auth.isAuthInitialized ? (
                    <>
                        <ConnectedLoginPage onSubmit={this.onSubmit.bind(this)}
                                            navigateToForgotPassword={this.navigateToForgotPassword.bind(this)}
                                            isSuccessful={this.props.auth.isSuccessful}
                                            isError={this.props.auth.isError}
                                            initialValues={initialValues}
                                            errorMessage={this.props.auth.errorMessage} />
                        {this.props.auth.isInProgress ? <LoadingSpinner /> : null}
                        {this.props.auth.isSuccessful && useOtp ? <ConnectedHandleOTP next={next} /> : null}
                        {this.props.auth.isSuccessful && !useOtp ? <ExternalRedirect next={next} /> : null}
                    </>
                ) : <LoadingSpinner />}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        auth: state.auth
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({submitAuth, initializeAuth, reset}, dispatch)
    };
}

export const ConnectedLoginPageContainer = connect(mapStateToProps, mapActionToProps)(LoginPageContainer);