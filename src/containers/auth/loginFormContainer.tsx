import React from 'react'
import {connect} from "react-redux";
import {submitAuth} from "../../actionCreators/authActionCreators";
import {bindActionCreators} from "redux";
import LoginForm, {LoginFormData} from "../../components/auth/loginForm";
import { RouteComponentProps } from 'react-router';
import { State } from '../../store/state';
import LoadingSpinner from "../../components/loadingSpinner";

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
        return (
            <React.Fragment>
                <LoginForm onSubmit={this.onSubmit.bind(this)}
                           navigateToForgotPassword={this.navigateToForgotPassword.bind(this)}
                           auth={this.props.auth} />
                {this.props.auth.isInProgress ? <LoadingSpinner /> : null}
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