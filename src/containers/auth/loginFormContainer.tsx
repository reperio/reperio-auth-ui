import React from 'react'
import {connect} from "react-redux";
import {submitAuth, initializeAuth} from "../../actionCreators/authActionCreators";
import {bindActionCreators} from "redux";
import LoginForm, {LoginFormData} from "../../components/auth/loginForm";
import { RouteComponentProps } from 'react-router';
import { State } from '../../store/state';
import LoadingSpinner from "../../components/loadingSpinner";
import ExternalRedirect from "../../components/externalRedirect";
import queryString from "query-string";

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class LoginFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    componentDidMount() {
        if (!this.props.auth.isAuthInitialized) {
            this.props.actions.initializeAuth();
        }
    }

    async onSubmit(values: LoginFormData) {
        const queryParams = queryString.parse(this.props.location.search);
        const useOtp = "otp" in queryParams;

        await this.props.actions.submitAuth(values.primaryEmailAddress, values.password, useOtp);
    };

    async navigateToForgotPassword() {
        // history.push('/forgotPassword');
        console.log("navigateToForgotPassword")
    };

    render() {
        const queryParams = queryString.parse(this.props.location.search);
        const next = queryParams.next as string;
        const useOtp = "otp" in queryParams;

        return (
            <React.Fragment>
                {this.props.auth.isAuthInitialized ? (
                    <React.Fragment>
                        <LoginForm onSubmit={this.onSubmit.bind(this)}
                                   navigateToForgotPassword={this.navigateToForgotPassword.bind(this)}
                                   auth={this.props.auth} />
                    </React.Fragment>
                ) : <LoadingSpinner />}
                {this.props.auth.isInProgress || this.props.auth.otpIsInProgress || this.props.auth.otpIsSuccessful ? <LoadingSpinner /> : null}
                {useOtp && this.props.auth.otpIsSuccessful ? <ExternalRedirect otp={this.props.auth.otp} next={next} /> : null}
                {!useOtp && this.props.auth.isSuccessful ? <ExternalRedirect next={next} /> : null}
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
        actions: bindActionCreators({submitAuth, initializeAuth}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);