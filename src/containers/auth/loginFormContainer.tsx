import React from 'react'
import {connect} from "react-redux";
import {submitAuth} from "../../actionCreators/authActionCreators";
import {bindActionCreators} from "redux";
import LoginForm, {LoginFormData} from "../../components/auth/loginForm";
import { RouteComponentProps } from 'react-router';
import { State } from '../../store/state';
import LoadingSpinner from "../../components/loadingSpinner";
import RedirectWithOTP from "../../components/redirectWithOTP";
import queryString from "query-string";

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class LoginFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(values: LoginFormData) {
        await this.props.actions.submitAuth(values.primaryEmailAddress, values.password);
    };

    async navigateToForgotPassword() {
        // history.push('/forgotPassword');
        console.log("navigateToForgotPassword")
    };

    render() {
        const queryParams = queryString.parse(this.props.location.search);
        const next = queryParams.next as string;

        return (
            <React.Fragment>
                <LoginForm onSubmit={this.onSubmit.bind(this)}
                           navigateToForgotPassword={this.navigateToForgotPassword.bind(this)}
                           auth={this.props.auth} />
                {this.props.auth.isInProgress || this.props.auth.otpIsInProgress ? <LoadingSpinner /> : null}
                {this.props.auth.otpIsSuccessful ? <RedirectWithOTP otp={this.props.auth.otp} next={next} /> : null}
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
        actions: bindActionCreators({submitAuth}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);