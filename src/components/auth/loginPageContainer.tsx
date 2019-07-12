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
    <div style={{width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', height: "54px", overflow: "hidden"}}>
        <img src={repBarSrc} style={{width: "100%", alignSelf: 'center', maxWidth: 1200 }} />
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
        const useOtp = "otp" in queryParams;
        return {next, useOtp};
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
        const {next, useOtp} = this.getQueryParams();

        return (
            <React.Fragment>
                <RepBar />
                {this.props.auth.isAuthInitialized ? (
                    <>
                        <ConnectedLoginPage onSubmit={this.onSubmit.bind(this)}
                                            navigateToForgotPassword={this.navigateToForgotPassword.bind(this)}
                                            isSuccessful={this.props.auth.isSuccessful}
                                            isError={this.props.auth.isError}
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